import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import { Home, Shelter, ShelterItem, SignIn, SignUp } from '@/pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/abrigo/:id" element={<Shelter />} />
      <Route path="/abrigo/item/:itemId" element={<ShelterItem />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Switch>
  );
};

export { Routes };
