import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import { CreateSupply, Home, Shelter, ShelterItem, SignIn } from '@/pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/abrigo/:id" element={<Shelter />} />
      <Route path="/abrigo/:shelterId/items" element={<ShelterItem />} />
      <Route
        path="/abrigo/:shelterId/item/cadastrar"
        element={<CreateSupply />}
      />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Switch>
  );
};

export { Routes };
