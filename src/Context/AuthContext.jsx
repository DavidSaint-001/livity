import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Auto-load user from local storage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("livity_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("livity_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("livity_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);