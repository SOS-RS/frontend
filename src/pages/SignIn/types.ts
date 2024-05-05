import { z } from "zod";

const signInFormSchema = z
  .object({
    login: z.string().min(1, "Este campo deve ser preenchido"),
    password: z.string().min(1, "Este campo deve ser preenchido"),
  })
  .strict();

export { signInFormSchema };
