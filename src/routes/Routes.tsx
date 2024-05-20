import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import {
  CreateShelter,
  CreateSupply,
  Home,
  Shelter,
  EditShelterSupply,
  SignIn,
  UpdateShelter,
  PrivacyPolicy,
  AboutUs,
  Supporters,
} from '@/pages';
import { ShelterSupplyTable } from '@/pages/ShelterSupplyTable/ShelterSupplyTable';

const Routes = () => {
  return (
    <Switch>
      <Route path="/abrigo/:shelterId" element={<Shelter />} />
      <Route path="/abrigo/:shelterId/atualizar" element={<UpdateShelter />} />
      <Route path="/abrigo/cadastrar" element={<CreateShelter />} />
      <Route path="/abrigo/:shelterId/items" element={<EditShelterSupply />} />
      <Route path="/abrigo/:shelterId/items/tabela" element={<ShelterSupplyTable />} />
      <Route
        path="/abrigo/:shelterId/item/cadastrar"
        element={<CreateSupply />}
      />
      <Route path="/" element={<Home />} />
      <Route path="/entrar" element={<SignIn />} />
      <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
      <Route path="/sobre-nos" element={<AboutUs />} />
      <Route path="/apoiadores" element={<Supporters />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Switch>
  );
};

export { Routes };
