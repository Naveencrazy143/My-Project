import React, { useState, createContext, useContext } from 'react';

export const AppContext = createContext({});

type AppProviderProps = {
  children?: React.ReactNode;
};

export const useApp = () =>
  useContext<{
    showLoader?: boolean;
    setShowLoader?: (loader: boolean) => void;
    focus?:string| number;
    setFocus?:(value: string | number | boolean) => void;
  }>(AppContext);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [focus, setFocus] = useState('')


  return (
    <AppContext.Provider
      value={{
        showLoader,
        setShowLoader,
        focus,
        setFocus
      }}>
      {children}
    </AppContext.Provider>
  );
};
