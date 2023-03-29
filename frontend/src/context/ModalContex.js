import { createContext, useContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProviderComponent = ({ children }) => {
  const [modal, setModal] = useState(null);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
