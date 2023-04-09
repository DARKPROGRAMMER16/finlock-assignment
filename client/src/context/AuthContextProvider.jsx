import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [loggedin, setLoggedin] = useState(undefined);
  const [user, setUser] = useState("");

  const getLoggedin = async () => {
    const loggedinRes = await axios.get("http://localhost:8080/auth/loggedin");
    setLoggedin(loggedinRes.data.status);
    setUser(loggedinRes.data.username);
  };

  useEffect(() => {
    getLoggedin();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedin, getLoggedin, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
