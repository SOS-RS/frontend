import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import { Home, Shelter, ShelterItem } from '@/pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/abrigo/:id" element={<Shelter />} />
      <Route path="/abrigo/:shelterId/items" element={<ShelterItem />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Switch>
  );
};

export { Routes };
