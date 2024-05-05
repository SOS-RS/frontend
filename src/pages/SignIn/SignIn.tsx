import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { signInFormSchema } from "./types";

import { SessionContext } from "@/contexts";

type SignInFormValues = z.infer<typeof signInFormSchema>;

const SignIn = () => {
  const { refreshSession } = useContext(SessionContext);
  const navigate = useNavigate();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = useCallback(async () => {}, [refreshSession]);

  return (
    <div className="flex h-screen justify-center ">
      <div className="flex flex-col justify-center gap-4 max-w-lg w-full p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
            <div className="justify-center flex md:justify-normal">
              <h1 className="font-bold text-4xl">SOS-RS</h1>
            </div>
            <span>Preencha abaixo as credenciais de acesso.</span>
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-base ">Email</FormLabel>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base ">Senha</FormLabel>
                    <FormLabel className="underline cursor-pointer text-slate-500 font-normal  hover:text-black ">
                      Esqueceu?
                    </FormLabel>
                  </div>
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
            <Button
              type="submit"
              className="min-h-[48px] rouded-[4px] bg-slate-800 hover:bg-slate-950 "
            >
              <span className="text-sm font-medium tracking-widest ">
                Entrar
              </span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export { SignIn };
