import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import { Home, SignIn, SignUp } from '@/pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Switch>
  );
};

export { Routes };
