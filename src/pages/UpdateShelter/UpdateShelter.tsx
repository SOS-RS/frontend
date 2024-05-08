import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Header, LoadingScreen, TextField } from '@/components';
import { Button } from '@/components/ui/button';

import { toast } from '@/components/ui/use-toast';
import { ShelterServices } from '@/service';
import { useShelter } from '@/hooks';
import { IUpdateShelter } from '@/service/shelter/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const UpdateShelter = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { shelterId = '-1' } = params;
  const { data: shelter, loading } = useShelter(shelterId);

  const {
    errors,
    getFieldProps,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    values,
  } = useFormik<IUpdateShelter>({
    initialValues: {
      shelteredPeople: shelter.shelteredPeople ?? 0,
      petFriendly: shelter.petFriendly ?? false,
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: Yup.object().shape({
      shelteredPeople: Yup.number().required('Este campo deve ser preenchido'),
      petFriendly: Yup.bool().required('Este campo deve ser preenchido'),
    }),
    onSubmit: async (values) => {
      try {
        await ShelterServices.update(shelterId, values);
        toast({
          title: 'Atualização feita com sucesso',
        });
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
            <TextField
              type="number"
              label="Quantidade de pessoas abrigadas"
              {...getFieldProps('shelteredPeople')}
              error={!!errors.shelteredPeople}
              helperText={errors.shelteredPeople}
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
