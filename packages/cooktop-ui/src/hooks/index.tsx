import React from 'react';

import { AuthProvider } from './Auth';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export const useToggle = (initialValue = false) => {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    debugger;
    setValue(v => !v);
  }, []);
  return [value, toggle];
}

export default AppProvider;
