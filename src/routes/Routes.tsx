import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import {
  CreateShelter,
  CreateSupply,
  Home,
  Shelter,
  ShelterItem,
} from '@/pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/abrigo/:id" element={<Shelter />} />
      <Route path="/abrigo/cadastrar" element={<CreateShelter />} />
      <Route path="/abrigo/:shelterId/items" element={<ShelterItem />} />
      <Route
        path="/abrigo/:shelterId/item/cadastrar"
        element={<CreateSupply />}
      />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Switch>
  );
};

export { Routes };
