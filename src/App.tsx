import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes/Routes';
import { SessionProvider } from './contexts';

const App = () => {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes />
      </SessionProvider>
    </BrowserRouter>
  );
};

export { App };
