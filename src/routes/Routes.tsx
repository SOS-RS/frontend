import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import {
  CreateShelter,
  CreateSupply,
  EditShelterSupply,
  Home,
  Shelter,
  SignIn,
  UpdateShelter,
} from '@/pages';
import { SignUp } from '@/pages/SignUp';

const Routes = () => {
  return (
    <Switch>
      <Route path="/abrigo/:id" element={<Shelter />} />
      <Route path="/abrigo/:shelterId/atualizar" element={<UpdateShelter />} />
      <Route path="/abrigo/cadastrar" element={<CreateShelter />} />
      <Route path="/abrigo/:shelterId/items" element={<EditShelterSupply />} />
      <Route
        path="/abrigo/:shelterId/item/cadastrar"
        element={<CreateSupply />}
      />
      <Route path="/" element={<Home />} />
      <Route path="/entrar" element={<SignIn />} />
      <Route path="/registrar" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Switch>
  );
};

export { Routes };
