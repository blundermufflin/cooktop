import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';

import Routes from './routes';
import { globalStyles } from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Global styles={globalStyles}/>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
