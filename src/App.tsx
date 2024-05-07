import { BrowserRouter } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';

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
