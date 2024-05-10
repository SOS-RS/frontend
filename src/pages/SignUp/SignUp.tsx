import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';

import { TextField } from '@/components';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { SessionContext } from '@/contexts';
import { withGuest } from '@/hocs';
import { UserServices } from '@/service';
import { ICreateUser } from '@/service/users/types';
import { useNavigate } from 'react-router-dom';

const SignUpComponent = () => {
  const { toast } = useToast();
  const { refreshSession } = useContext(SessionContext);
  const navigate = useNavigate();

  const { isSubmitting, errors, handleSubmit, getFieldProps } =
    useFormik<ICreateUser>({
      initialValues: {
        name: '',
        phone: '',
        password: '',
        lastName: ''
      },
      enableReinitialize: true,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnMount: false,
      validationSchema: Yup.object().shape({
        phone: Yup.string().required('Este campo deve ser preenchido').min(11, "Número inválido!"),
        name: Yup.string().required('Este campo deve ser preenchido'),
        password: Yup.string().required('Este campo deve ser preenchido'),
      }),
      onSubmit: async (values) => {
        try {
          await UserServices.create(values);
          toast({
            variant: 'default',
            title: 'Conta criada com sucesso!',
            description: `Estaremos te redirecionando para a pagina de login.`,
          });
          refreshSession();
          navigate('/entrar')
        } catch (err: any) {
          toast({
            variant: 'destructive',
            title: 'Ocorreu um erro ao realizar o login',
            description: `${
              err?.response?.data?.message ?? err?.message ?? err
            }`,
          });
        }
      },
    });

  return (
    <div className="flex h-screen justify-center items-center bg-slate-50 p-4">
      <div className="flex flex-col justify-center gap-4 max-w-lg w-full p-10 bg-white max-h-[600px] rounded-md shadow-sm">
        <form onSubmit={handleSubmit} className="contents">
          <div className="justify-center flex flex-col md:justify-normal">
            <h1 className="font-bold text-lg md:text-2xl text-red-600">
              SOS Rio Grande do Sul
            </h1>
            <span className="text-muted-foreground">
              Preencha abaixo para criar uma conta.
            </span>
          </div>
          <TextField
            label="Nome"
            {...getFieldProps('name')}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Sobrenome"
            {...getFieldProps('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            placeholder="(99) 99999-9999"
            label="Telefone"
            type="tel"
            {...getFieldProps('phone')}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            label="Senha"
            type="password"
            {...getFieldProps('password')}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            loading={isSubmitting}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 w-full"
          >
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
};

const SignUp = withGuest(SignUpComponent);

export { SignUp };
