import { useContext, useEffect } from 'react';
import { ChevronLeft, Loader } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import ReactSelect from 'react-select';

import {
  Authenticated,
  Header,
  LoadingScreen,
  SelectField,
  TextField,
} from '@/components';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ShelterServices } from '@/service';
import { useShelter } from '@/hooks';
import { IUpdateShelter } from '@/service/shelter/types';
import { SessionContext } from '@/contexts';
import { clearCache } from '@/api/cache';
import { hardCodedRsCities } from '../CreateShelter/hardcodedCities';
import { useDebouncedValue, useViaCep } from '@/hooks';
import { cn } from '@/lib/utils';
import { FullUpdateShelterSchema, UpdateShelterSchema } from './types';
import { useAuthRoles } from '@/hooks/useAuthRoles/useAuthRoles';

const UpdateShelter = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { shelterId = '-1' } = params;
  const { data: shelter, loading } = useShelter(shelterId);
  const { session } = useContext(SessionContext);
  const isAuthenticated = useAuthRoles('Staff');

  const {
    errors,
    getFieldProps,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    values,
    touched,
    setErrors,
  } = useFormik<IUpdateShelter>({
    initialValues: {
      shelteredPeople: shelter.shelteredPeople,
      petFriendly: shelter.petFriendly ?? false,
      verified: shelter.verified,
      address: shelter.address ?? '',
      capacity: shelter.capacity,
      contact: shelter.contact ?? '',
      pix: shelter.pix ?? '',
      street: shelter.street ?? '',
      neighbourhood: shelter.neighbourhood ?? '',
      city: shelter.city ?? '',
      streetNumber: shelter.streetNumber ?? '',
      zipCode: shelter.zipCode ?? '',
      name: shelter.name,
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: session ? FullUpdateShelterSchema : UpdateShelterSchema,
    onSubmit: async (values) => {
      try {
        if (isAuthenticated)
          await ShelterServices.adminUpdate(shelterId, values);
        else await ShelterServices.update(shelterId, values);
        toast({
          title: 'Atualização feita com sucesso',
        });
        clearCache(false);
        navigate(`/abrigo/${shelterId}`);
      } catch (err: any) {
        toast({
          variant: 'destructive',
          title: 'Ocorreu um erro ao tentar atualizar',
          description: `${err?.response?.data?.message ?? err}`,
        });
      }
    },
  });

  const debouncedZipcode = useDebouncedValue(
    touched?.zipCode ? values?.zipCode ?? '' : '',
    500
  );

  const { data: cepData, loading: isLoadingZipCodeData } =
    useViaCep(debouncedZipcode);

  useEffect(() => {
    if (!cepData) return;

    if (cepData.logradouro) setFieldValue('street', cepData.logradouro);
    if (cepData.bairro) setFieldValue('neighbourhood', cepData.bairro);
    if (cepData.localidade) setFieldValue('city', cepData.localidade);
  }, [cepData, setFieldValue, setErrors]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="Atualização cadastral"
        className="bg-white [&_*]:text-zinc-800 border-b-[1px] border-b-border"
        startAdornment={
          <Button
            variant="ghost"
            className="[&_svg]:stroke-blue-500"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} />
          </Button>
        }
      />
      <div className="p-4 flex flex-col max-w-5xl w-full gap-3 items-start h-full">
        <form className="contents" onSubmit={handleSubmit}>
          <h6 className="text-2xl font-semibold">Atualizar abrigo</h6>
          <p className="text-muted-foreground">
            Atualize as informações desejadas sobre o abrigo.
          </p>
          <div className=" flex flex-col max-w-5xl w-full gap-6 items-start">
            <Authenticated role="Staff">
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
                label="Endereço"
                {...getFieldProps('address')}
                error={!!errors.address}
                helperText={errors.address}
              />
              <TextField
                label="Contato"
                {...getFieldProps('contact')}
                error={!!errors.contact}
                helperText={errors.contact}
              />
              <TextField
                type="number"
                label="Capacidade total do abrigo"
                {...getFieldProps('capacity')}
                error={!!errors.capacity}
                helperText={errors.capacity}
              />
            </Authenticated>
            <TextField
              type="number"
              label="Quantidade de pessoas abrigadas"
              {...getFieldProps('shelteredPeople')}
              error={!!errors.shelteredPeople}
              helperText={errors.shelteredPeople}
            />
            <SelectField
              label="O abrigo aceita animais"
              value={values.petFriendly ? 'true' : 'false'}
              onSelectChange={(v) => setFieldValue('petFriendly', v === 'true')}
              options={[
                { value: 'true', label: 'Sim' },
                { value: 'false', label: 'Não' },
              ]}
            />
            <Authenticated role="Staff">
              <SelectField
                label="O abrigo é verificado"
                value={values.verified ? 'true' : 'false'}
                onSelectChange={(v) => setFieldValue('verified', v === 'true')}
                options={[
                  { value: 'true', label: 'Sim' },
                  { value: 'false', label: 'Não' },
                ]}
              />
              <TextField
                label="Pix"
                {...getFieldProps('pix')}
                error={!!errors.pix}
                helperText={errors.pix}
              />
            </Authenticated>
          </div>
          <div className="flex flex-1 flex-col justify-end md:justify-start w-full py-6">
            <Button
              loading={isSubmitting}
              type="submit"
              className="flex gap-2 text-white font-medium text-lg bg-blue-500 hover:bg-blue-600 w-full"
            >
              Atualizar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { UpdateShelter };
