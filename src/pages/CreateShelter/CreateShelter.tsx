import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const CreateShelter = () => {
  const navigate = useNavigate();

  const verifySelected = (selected: string) => {
    if (selected === 'sim') return true;
    return false;
  };

  const { errors, getFieldProps, isSubmitting, setFieldValue, handleSubmit } =
    useFormik<ICreateShelter>({
      initialValues: {
        name: '',
        address: '',
        shelteredPeople: 0,
        capacity: 0,
        petFriendly: false,
        contact: '',
        pix: '',
      },
      enableReinitialize: true,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnMount: false,
      validationSchema: Yup.object().shape({
        name: Yup.string().required('Este campo deve ser preenchido'),
        address: Yup.string().required('Este campo deve ser preenchido'),
      }),
      onSubmit: async (values) => {
        //criar endpoint
        console.log(values);
      },
    });

  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="Cadastrar novo abrigo"
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
              label="Contato"
              {...getFieldProps('contact')}
              error={!!errors.contact}
              helperText={errors.contact}
            />

            <TextField
              type="number"
              label="Quantidade de pessoas abrigadas"
              {...getFieldProps('shelteredPeople')}
              error={!!errors.shelteredPeople}
              helperText={errors.shelteredPeople}
            />

            <TextField
              type="number"
              label="Capacidade do abrigo"
              {...getFieldProps('capacity')}
              error={!!errors.capacity}
              helperText={errors.capacity}
            />

            <label className="text-muted-foreground">
              O abrigo aceita animais
            </label>
            <Select
              onValueChange={(v) => {
                setFieldValue('petFriendly', verifySelected(v));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue className="text-muted-foreground" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
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

export { CreateShelter };
