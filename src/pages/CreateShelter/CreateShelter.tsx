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
import { IUseShelterData } from '@/hooks/useShelter/types';

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
        const address = checkAndFormatAddress(values as IUseShelterData);
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
    <div className="flex flex-col h-screen items-center">
      <Header
        title="Cadastrar novo abrigo"
        className="bg-white [&_*]:text-zinc-800 border-b-[1px] border-b-border"
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
      <div className="p-4 flex flex-col max-w-5xl w-full gap-3 items-start h-full">
        <form className="contents" onSubmit={handleSubmit}>
          <h6 className="text-2xl font-semibold">Cadastrar novo abrigo</h6>
          <p className="text-muted-foreground">
            Adicione as informações necessarias para o cadastro do novo abrigo.
          </p>
          <div className=" flex flex-col max-w-5xl w-full gap-2 items-start">
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
              <Loader className="animate-spin h-15 w-15 stroke-black" />
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
            <div className="flex flex-col gap-1 w-full">
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
                  'border-[1px] border-red-600 rounded-md': errors.city,
                })}
              />
              {errors.city && (
                <p className={'text-red-600 text-sm'}>{errors.city}</p>
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
          <div className="flex flex-1 flex-col justify-end md:justify-start w-full py-6">
            <Button
              loading={isSubmitting}
              type="submit"
              className="flex gap-2 text-white font-medium text-lg bg-blue-500 hover:bg-blue-600 w-full"
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
