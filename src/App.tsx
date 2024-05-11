import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes/Routes';
import { SessionProvider } from './contexts';
import { Toaster } from './components/ui/toaster';
import 'leaflet/dist/leaflet.css'

const App = () => {
  return (
    <Fragment>
      <Toaster />
      <BrowserRouter>
        <SessionProvider>
          <Routes />
        </SessionProvider>
      </BrowserRouter>
    </Fragment>
  );
};

export { App };
