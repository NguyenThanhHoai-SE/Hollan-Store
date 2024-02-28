import React, { useContext } from "react";
import { useState } from "react";

interface MainLayoutContextValue {
  isShowCart: boolean;
  setIsShowCart: (value: boolean) => void;
}

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayoutContext = React.createContext<MainLayoutContextValue>({
  isShowCart: false,
  setIsShowCart: () => {},
});

const MainLayoutProvider = ({ children }: MainLayoutProps) => {
  const [isShowCart, setIsShowCart] = useState(false);
  const contextValue = React.useMemo(
    () => ({
      isShowCart,
      setIsShowCart,
    }),
    [isShowCart, setIsShowCart]
  );

  return (
    <MainLayoutContext.Provider value={contextValue}>
      {children}
    </MainLayoutContext.Provider>
  );
};

const useMainLayoutContext = () => {
  const popups = useContext(MainLayoutContext);
  if (popups == null) {
    throw new Error(
      "useMainLayoutContext() called outside of a PopUpProvider?"
    );
  }
  return popups;
};

export { MainLayoutProvider, useMainLayoutContext };
