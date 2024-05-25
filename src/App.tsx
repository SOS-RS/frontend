import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { SessionProvider } from './contexts';
import { Routes } from './routes/Routes';
import { BackToTop } from '@/components/BackToTop';

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <SessionProvider>
          <BackToTop/>
          <Routes />
        </SessionProvider>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export { App };
