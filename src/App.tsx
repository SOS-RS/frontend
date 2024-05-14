import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes/Routes';
import { DonationCartProvider, SessionProvider } from './contexts';
import { Toaster } from './components/ui/toaster';
import { BackToTop } from '@/components';
import { SessionProvider } from './contexts';

const App = () => {
  return (
    <Fragment>
      <Toaster />
      <BrowserRouter>
        <SessionProvider>
          <DonationCartProvider>
            <ThemeProvider defaultTheme='light'>
              <BackToTop />
              <Routes />
            </ThemeProvider>
          </DonationCartProvider>
        </SessionProvider>
      </BrowserRouter>
    </Fragment>
  );
};

export { App };
