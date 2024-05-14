import * as Yup from 'yup';

const signInFormSchema = Yup.object().shape({
  login: Yup.string().min(1, "Este campo deve ser preenchido"),
  password: Yup.string().min(1, "Este campo deve ser preenchido"),
});


export { signInFormSchema };
