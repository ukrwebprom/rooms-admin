import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import client from "../api/client";

// создаём сам контекст
const AuthContext = createContext(null);

// хук для удобного доступа
export const useAuth = () => useContext(AuthContext);


// провайдер
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = не залогинен
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthReady(true); // токена нет — заканчиваем инициализацию
      return;
    }
    (async () => {
      try {
        const res = await client.get("/auth/profile"); // проверяем токен на сервере
        setUser(res.data.user);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setAuthReady(true); // ← готово: теперь роутер может решать
      }
    })();
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    localStorage.setItem("token", userData.token);
  }
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  }

  const value = { user, login, logout, authReady, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
