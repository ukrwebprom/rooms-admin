import { createContext, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import client, { setToken } from "../api/client";

// создаём сам контекст
const AuthContext = createContext(null);

// хук для удобного доступа
export const useAuth = () => useContext(AuthContext);


// провайдер
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = не залогинен
  const [authReady, setAuthReady] = useState(false);
  const [session, setSession] = useState(() => {
    const raw = localStorage.getItem("auth:session");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // const login = (userData) => {
  //   setUser(userData.user);
  //   localStorage.setItem("token", userData.token);
  // }

  const login = async ({ email, password }) => {
    setLoading(true); setError(null);
    
    try {
      // const { data } = await client.post("/auth/login", { email, password });
      const { data } = await client.get("/auth2/test-login", { email, password });
      
      // сервер возвращает: user, abilities, scopes, currentPropertyId, token?
      const newSession = {
        user: data.user,
        abilities: data.abilities || [],
        scopes: data.scopes || {},
        currentPropertyId: data.currentPropertyId || null,
      };

      if (data.token) setToken(data.token); // Bearer-вариант
      setSession(newSession);
      localStorage.setItem("auth:session", JSON.stringify(newSession));
      console.log(newSession);
      return { ok: true };
    } catch (e) {
      setError(e.response?.data?.error || e.message);
      return { ok: false, error: e.message };
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  }

  const setCurrentPropertyId = (propertyId) => {
    const updated = { ...session, currentPropertyId: propertyId };
    setSession(updated);
    localStorage.setItem("auth:session", JSON.stringify(updated));
  };

  const value = useMemo(() => ({
    user: session?.user || null,
    abilities: session?.abilities || [],
    scopes: session?.scopes || {},
    currentPropertyId: session?.currentPropertyId || null,
    loading, error,
    login, logout, setCurrentPropertyId,
  }), [session, loading, error]);

  // const value = { user, login, logout, authReady, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
