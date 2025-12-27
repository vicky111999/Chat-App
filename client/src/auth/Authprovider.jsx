import { useEffect, useState } from "react";
import api from "../api/Axios";
import { AuthContext } from "./AuthContext.jsx";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loaduser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loaduser();
  }, []);

  const login = async (email, password) => {
    try {
     
      await api.post("/api/auth/login", { email, password });
      await loaduser();
    } catch (err) {
      console.log(err?.response?.data?.message);
      setLoading(false);
    }
  };
  const register = async (email, password, name) => {
    try {
      
      await api.post("/api/auth/register", { name, email, password });
      await login(email, password);
    } catch (err) {
      console.log(err?.response?.data?.message);
      setLoading(false);
    }
  };
  const logout = async () => {
    await api
      .post("/api/auth/logout")
      .then(setUser(null))
      .catch((err) => err.message);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
