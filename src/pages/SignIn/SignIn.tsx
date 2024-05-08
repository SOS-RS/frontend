import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useContext } from 'react';

import { Button } from '@/components/ui/button';
import { SessionContext } from '@/contexts';
import { TextField } from '@/components';
import { IAuthRequest } from '@/service/sessions/types';
import { useToast } from '@/components/ui/use-toast';
import { SessionServices } from '@/service';
import { withGuest } from '@/hocs';

const SignInComponent = () => {
  const { toast } = useToast();
  const { refreshSession } = useContext(SessionContext);

  const { isSubmitting, errors, handleSubmit, getFieldProps } =
    useFormik<IAuthRequest>({
      initialValues: {
        login: '',
        password: '',
      },
      enableReinitialize: true,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnMount: false,
      validationSchema: Yup.object().shape({
        login: Yup.string().required('Este campo deve ser preenchido'),
        password: Yup.string().required('Este campo deve ser preenchido'),
      }),
      onSubmit: async (values) => {
        try {
          const resp = await SessionServices.auth(values);
          localStorage.setItem('token', resp.token);
          refreshSession();
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
              Preencha abaixo as credenciais de acesso.
            </span>
          </div>
          <TextField
            label="Login"
            {...getFieldProps('login')}
            error={!!errors.login}
            helperText={errors.login}
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
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

const SignIn = withGuest(SignInComponent);

export { SignIn };
