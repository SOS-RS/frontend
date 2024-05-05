import { z } from "zod";

const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Este campo deve ser preenchido"),
    surName: z.string().min(1, "Este campo deve ser preenchido"),
    email: z.string().min(1, "Este campo deve ser preenchido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Deveo ser igual ao campo senha"),
    phone: z.string().min(8, "Este campo deve ser preenchido"),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export { signUpFormSchema };
