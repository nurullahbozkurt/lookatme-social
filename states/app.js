import { createContext, useContext, useState } from "react";

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [isOpenEditProfileModal, setIsOpenEditProfileModal] = useState(false);
  const [usersIFollow, setUsersIFollow] = useState(false);
  return (
    <AppContext.Provider
      value={{
        isOpenEditProfileModal,
        setIsOpenEditProfileModal,
        usersIFollow,
        setUsersIFollow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, useAppContext };
