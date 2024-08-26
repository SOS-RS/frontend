import { BrowserRouter } from 'react-router-dom';
import { TooltipProvider } from './components/ui/tooltip';
import { Routes } from './routes/Routes';
import { DonationCartProvider, SessionProvider } from './contexts';
import { Toaster } from './components/ui/toaster';
import { BackToTop } from '@/components';


const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <SessionProvider>
          <DonationCartProvider>
            <BackToTop />
            <Routes />
          </DonationCartProvider>
        </SessionProvider>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export { App };
