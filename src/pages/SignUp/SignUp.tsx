import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { tokenName } from "@/lib/utils";
import { SessionServices, UserServices } from "@/services";
import { SessionContext } from "@/contexts";
import { signUpFormSchema } from "./types";

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const SignUp = () => {
  const { toast } = useToast();
  const { refreshSession } = useContext(SessionContext);
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      surName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  const onSubmit = useCallback(
    async (payload: SignUpFormValues) => {
      try {
        await UserServices.create(payload);
        const data = await SessionServices.auth({
          login: payload.email,
          password: payload.password,
        });
        localStorage.setItem(tokenName(), data.token);
        refreshSession();
      } catch (error: any) {
        console.log(error);
        toast({
          title: "Ocorreu um erro ao realizar o cadastro",
          description: error?.response?.data?.message,
        });
      }
    },
    [refreshSession, toast]
  );

  return (
    <div className="flex h-screen justify-center">
      <div className="flex flex-col justify-center gap-4 max-w-lg w-full p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
            <div className="justify-center flex md:justify-normal">
              <h1 className="font-bold text-4xl">SOS-RS</h1>
            </div>
            <span>Preencha abaixo seus dados.</span>
            <div className="flex flex-wrap w-full gap-2 ">
              <div className="flex-1  md:max-w-44">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-base  ">Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-sm text-sm font-medium tracking-widest min-h-[48px] border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 ">
                <FormField
                  control={form.control}
                  name="surName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-base  ">Sobrenome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-sm text-sm font-medium tracking-widest min-h-[48px] border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-base  ">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      className="rounded-sm text-sm font-medium tracking-widest min-h-[48px] border-slate-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row w-full gap-2">
              <div className="flex-1 ">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-base  ">Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          className="rounded-sm text-sm font-medium tracking-widest min-h-[48px] border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 ">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-base  ">
                        Confirmar senha
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          className="rounded-sm text-sm font-medium tracking-widest min-h-[48px] border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base  ">Celular</FormLabel>
                  <FormControl>
                    <InputMask
                      mask="(99) 99999-9999"
                      maskChar={null}
                      {...field}
                      className="border-[1px] rounded-sm w-full text-sm font-medium tracking-widest min-h-[48px]  border-slate-600 bg-transparent px-3 py-1 shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="min-h-[48px] rouded-[4px] bg-slate-800 hover:bg-slate-950 "
            >
              <span className="text-sm font-medium tracking-widest">
                Criar Conta
              </span>
            </Button>
            <div className="flex justify-center">
              <span className="text-slate-500 font-normal ">
                Já possui uma conta?
              </span>
              <span
                className="underline cursor-pointer font-normal pl-1 text-slate-500 hover:text-black "
                onClick={() => navigate(`/signip`)}
              >
                Faça login
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export { SignUp };
