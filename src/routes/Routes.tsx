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
<<<<<<< HEAD
  SupplyHistory,
=======
  Supporters,
>>>>>>> 5e94e5dd1fbcfd1dd77605455326e61dc2bb28ab
} from '@/pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/abrigo/:shelterId" element={<Shelter />} />
      <Route path="/abrigo/:shelterId/atualizar" element={<UpdateShelter />} />
      <Route path="/abrigo/cadastrar" element={<CreateShelter />} />
      <Route path="/abrigo/:shelterId/items" element={<EditShelterSupply />} />
      <Route
        path="/abrigo/:shelterId/items/historico"
        element={<SupplyHistory />}
      />
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
