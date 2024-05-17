import { Fragment, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Hotjar from '@hotjar/browser'

import { Routes } from './routes/Routes';
import { SessionProvider } from './contexts';
import { Toaster } from './components/ui/toaster';

const App = () => {
  useEffect(() => {
    const siteId = import.meta.env.VITE_HOTJAR_SITE_ID;
    const hotjarVersion =  import.meta.env.VITE_HOTJAR_VERSION;
    Hotjar.init(siteId, hotjarVersion, {
        debug: import.meta.env.VITE_HOTJAR_DEBUG
      });
  }, [])
  
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
