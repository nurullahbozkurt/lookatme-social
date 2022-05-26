import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let userInStorage = localStorage.getItem("user");
    if (userInStorage !== "undefined") {
      setUser(JSON.parse(userInStorage));
    }
  }, []);

  const login = (user, accessToken) => {
    updateUser(user);
    localStorage.setItem("token", accessToken);
  };

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ login, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, useAuth };
