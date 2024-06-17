import { useEffect } from 'react';
import { ChevronLeft, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactSelect from 'react-select';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Header, TextField } from '@/components';
import { Button } from '@/components/ui/button';
import { ICreateShelter } from '@/service/shelter/types';
import { toast } from '@/components/ui/use-toast';
import { ShelterServices } from '@/service';
import { withAuth } from '@/hocs';
import { clearCache } from '@/api/cache';
import { hardCodedRsCities } from './hardcodedCities';
import { useDebouncedValue, useViaCep } from '@/hooks';
import { cn } from '@/lib/utils';
import { checkAndFormatAddress } from '@/components/CardAboutShelter';

const CreateShelterComponent = () => {
  const navigate = useNavigate();

  const {
    errors,
    getFieldProps,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    values,
    setErrors,
  } = useFormik<ICreateShelter>({
    initialValues: {
      name: '',
      street: '',
      neighbourhood: '',
      city: '',
      streetNumber: null,
      zipCode: '',
      shelteredPeople: 0,
      capacity: 0,
      verified: false,
      petFriendly: false,
      contact: null,
      pix: null,
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Este campo deve ser preenchido'),
      shelteredPeople: Yup.number()
        .min(0, 'O valor mínimo para este campo é 0')
        .nullable(),
      capacity: Yup.number()
        .min(1, 'O valor mínimo para este campo é 1')
        .nullable(),
      street: Yup.string().required('Este campo deve ser preenchido'),
      neighbourhood: Yup.string().required('Este campo deve ser preenchido'),
      city: Yup.string().required('Este campo deve ser preenchido'),
      streetNumber: Yup.string()
        .min(0, 'O valor mínimo para este campo é 1')
        .required('Este campo deve ser preenchido'),
      zipCode: Yup.string().required('Este campo deve ser preenchido'),
      contact: Yup.string().nullable(),
      pix: Yup.string().nullable(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const address = checkAndFormatAddress({
          address: values.address,
          city: values.city,
          neighbourhood: values.neighbourhood,
          street: values.street,
          streetNumber: values.streetNumber,
        });
        await ShelterServices.create({ ...values, address });
        clearCache(false);
        toast({
          title: 'Cadastro feita com sucesso',
        });
        resetForm();
      } catch (err: any) {
        toast({
          variant: 'destructive',
          title: 'Ocorreu um erro ao tentar cadastrar',
          description: `${err?.response?.data?.message ?? err}`,
        });
      }
    },
  });
  const debouncedZipcode = useDebouncedValue(values?.zipCode ?? '', 500);

  const { data: cepData, loading: isLoadingZipCodeData } =
    useViaCep(debouncedZipcode);

  useEffect(() => {
    if (!cepData) return;

    if (cepData.logradouro) setFieldValue('street', cepData.logradouro);
    if (cepData.bairro) setFieldValue('neighbourhood', cepData.bairro);
    if (cepData.localidade) setFieldValue('city', cepData.localidade);
    setErrors({});
  }, [cepData, setFieldValue, setErrors]);

  return (
    <div className="flex h-screen flex-col items-center">
      <Header
        title="Cadastrar novo abrigo"
        className="border-b-[1px] border-b-border bg-white [&_*]:text-zinc-800"
        startAdornment={
          <Button
            variant="ghost"
            className="[&_svg]:stroke-blue-500"
            onClick={() => navigate('/')}
          >
            <ChevronLeft size={20} />
          </Button>
        }
      />
      <div className="flex h-full w-full max-w-5xl flex-col items-start gap-3 p-4">
        <form className="contents" onSubmit={handleSubmit}>
          <h6 className="text-2xl font-semibold">Cadastrar novo abrigo</h6>
          <p className="text-muted-foreground">
            Adicione as informações necessarias para o cadastro do novo abrigo.
          </p>
          <div className="flex w-full max-w-5xl flex-col items-start gap-2">
            <TextField
              label="Nome do abrigo"
              {...getFieldProps('name')}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="CEP"
              {...getFieldProps('zipCode')}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
            />
            {Boolean(isLoadingZipCodeData) && (
              <Loader className="h-15 w-15 animate-spin stroke-black" />
            )}
            <TextField
              label="Logradouro (Rua/avenida)"
              {...getFieldProps('street')}
              error={!!errors.street}
              helperText={errors.street}
            />
            <TextField
              label="Número"
              {...getFieldProps('streetNumber')}
              error={!!errors.streetNumber}
              helperText={errors.streetNumber}
            />
            <TextField
              label="Bairro"
              {...getFieldProps('neighbourhood')}
              error={!!errors.neighbourhood}
              helperText={errors.neighbourhood}
            />
            <div className="flex w-full flex-col gap-1">
              <label className="text-muted-foreground" htmlFor="city">
                Cidade
              </label>
              <ReactSelect
                name="city"
                placeholder="Cidade"
                value={{
                  label: values.city,
                  value: values.city,
                }}
                options={hardCodedRsCities.map((item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={(v) => {
                  setFieldValue('city', v?.value);
                }}
                className={cn('w-full', {
                  'rounded-md border-[1px] border-red-600': errors.city,
                })}
              />
              {errors.city && (
                <p className={'text-sm text-red-600'}>{errors.city}</p>
              )}
            </div>
            <TextField
              label="Contato"
              {...getFieldProps('contact')}
              error={!!errors.contact}
              helperText={errors.contact}
            />
            <TextField
              type="number"
              min="0"
              label="Quantidade de pessoas abrigadas"
              {...getFieldProps('shelteredPeople')}
              error={!!errors.shelteredPeople}
              helperText={errors.shelteredPeople}
            />
            <TextField
              type="number"
              min="0"
              label="Capacidade do abrigo"
              {...getFieldProps('capacity')}
              error={!!errors.capacity}
              helperText={errors.capacity}
            />
            <label className="text-muted-foreground">
              O abrigo aceita animais
            </label>
            <Select
              value={values.petFriendly ? 'true' : 'false'}
              onValueChange={(v) => {
                setFieldValue('petFriendly', v === 'true');
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue className="text-muted-foreground" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Sim</SelectItem>
                <SelectItem value="false">Não</SelectItem>
              </SelectContent>
            </Select>
            <TextField
              label="Chave pix"
              {...getFieldProps('pix')}
              error={!!errors.pix}
              helperText={errors.pix}
            />
          </div>
          <div className="flex w-full flex-1 flex-col justify-end py-6 md:justify-start">
            <Button
              loading={isSubmitting}
              type="submit"
              className="flex w-full gap-2 bg-blue-500 text-lg font-medium text-white hover:bg-blue-600"
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateShelter = withAuth(CreateShelterComponent);

export { CreateShelter };
