import { ChevronLeft, CircleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMask } from '@react-input/mask';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, Header, TextField } from '@/components';
import { Button } from '@/components/ui/button';
import { ICreateShelter } from '@/service/shelter/types';
import { toast } from '@/components/ui/use-toast';
import { ShelterServices } from '@/service';

const CreateShelter = () => {
  const inputRefMaskPhone = useMask({
    mask: '(__) _____-____ ',
    replacement: { _: /\d/ },
  });
  const navigate = useNavigate();

  const alertDescription = 'O cadastro ficará pendente até ser aprovado.';

  const {
    errors,
    getFieldProps,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    values,
  } = useFormik<ICreateShelter>({
    initialValues: {
      name: '',
      address: '',
      shelteredPeople: 0,
      capacity: 0,
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
      address: Yup.string().required('Este campo deve ser preenchido'),
      shelteredPeople: Yup.number()
        .min(0, 'O valor mínimo para este campo é 0')
        .nullable(),
      capacity: Yup.number()
        .min(1, 'O valor mínimo para este campo é 1')
        .nullable(),
      petFriendly: Yup.bool().nullable(),
      contact: Yup.string()
        .min(15, 'O valor mínimo para este campo é 15')
        .nullable(),
      pix: Yup.string().nullable(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await ShelterServices.create(values);
        toast({
          title: 'Cadastro feito com sucesso!',
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

  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="Cadastrar novo abrigo"
        className="bg-white [&_*]:text-zinc-800 border-b-[1px] border-b-border"
        showButtonRegisterShelter={false}
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
              label="Endereço do abrigo"
              {...getFieldProps('address')}
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              ref={inputRefMaskPhone}
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
          <Alert
            description={alertDescription}
            startAdornment={
              <CircleAlert size={20} className="stroke-light-yellow" />
            }
          />
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

export { CreateShelter };
