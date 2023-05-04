import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Cookies from "js-cookie";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const navigate = useNavigate("/");
  const initialToken = Cookies.get("jwt");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    Cookies.remove("jwt");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
