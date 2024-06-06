import * as Yup from 'yup';

const FullUpdateShelterSchema = Yup.object().shape({
  shelteredPeople: Yup.number().nullable(),
  petFriendly: Yup.bool().required('Este campo deve ser preenchido'),
  verified: Yup.bool(),
  address: Yup.string().nullable(),
  capacity: Yup.string().nullable(),
  pix: Yup.string().nullable(),
  name: Yup.string(),
  street: Yup.string().required('Este campo deve ser preenchido'),
  neighbourhood: Yup.string().required('Este campo deve ser preenchido'),
  city: Yup.string().required('Este campo deve ser preenchido'),
  streetNumber: Yup.string()
    .min(0, 'O valor mínimo para este campo é 1')
    .required('Este campo deve ser preenchido'),
  zipCode: Yup.string().nullable(),
});

const UpdateShelterSchema = Yup.object().shape({
  shelteredPeople: Yup.number().nullable(),
  petFriendly: Yup.bool().required('Este campo deve ser preenchido'),
});

export { FullUpdateShelterSchema, UpdateShelterSchema };
