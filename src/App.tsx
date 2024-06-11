import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes/Routes';
import { DonationCartProvider, SessionProvider } from './contexts';
import { Toaster } from './components/ui/toaster';
import { BackToTop } from '@/components';

const App = () => {
  return (
    <Fragment>
      <Toaster />
      <BrowserRouter>
        <SessionProvider>
          <DonationCartProvider>
            <BackToTop />
            <Routes />
          </DonationCartProvider>
        </SessionProvider>
      </BrowserRouter>
    </Fragment>
  );
};

export { App };
