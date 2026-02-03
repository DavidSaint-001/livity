import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Auto-load user from local storage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("livity_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email, password) => {
    const savedUser = localStorage.getItem("livity_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === email && user.password === password) {
        setUser(user);
        return true;
      } else {
        throw new Error("Invalid email or password");
      }
    } else {
      throw new Error("User not found");
    }
  };

  const signup = (email, password, name) => {
    const user = { name, email, password };
    setUser(user);
    localStorage.setItem("livity_user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("livity_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);