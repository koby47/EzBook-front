import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && typeof parsed === "object") {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.error("Invalid user data in localStorage:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } 
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
