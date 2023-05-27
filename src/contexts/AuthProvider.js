import { createContext, useState, useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const initialState = {
  id: null,
  role: null,
  username: "",
  email: "",
  token: ""
};

const getUserStorage = () => {
  const user = localStorage.getItem("user");
  return user ?JSON.parse(user) : initialState;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserStorage);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user])

  const login = (logUser) => {
    setUser((prevState) => ({
      ...prevState,
      ...logUser
    }));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(initialState);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
