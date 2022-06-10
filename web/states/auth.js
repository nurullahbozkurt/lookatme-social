import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(true);

  useEffect(() => {
    setUserLoaded(true);
    let userInStorage = localStorage.getItem("user");
    if (userInStorage !== "undefined") {
      setUser(JSON.parse(userInStorage));
    }
    setUserLoaded(false);
  }, []);

  const login = (user, accessToken) => {
    updateUser(user);
    localStorage.setItem("token", accessToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{ login, localUser: user, logout, userLoaded }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, useAuth };
