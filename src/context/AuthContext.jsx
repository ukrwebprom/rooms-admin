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
  const [session, setSession] = useState(null);
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
        const {data} = await client.get("/auth/profile"); // проверяем токен на сервере
        console.log('data', data);
        const newSession = {
          user: data.user,
          abilities: data.abilities || [],
          scopes: data.scopes || {},
          currentPropertyId: data.currentPropertyId || null,
        };
        if (data.token) setToken(data.token); // Bearer-вариант
        setSession(newSession);
        //localStorage.setItem("auth:session", JSON.stringify(newSession));
        setAuthReady(true);
        
      } catch(e) {
        setError(e.response?.data?.error || e.message);
        console.log(e);
        //localStorage.removeItem("token");
        //setSession(null);
      } finally {
        setAuthReady(true); // ← готово: теперь роутер может решать
      }
    })();
  }, []);


  const login = async ({ email, password }) => {
    setLoading(true); setError(null);
    
    try {
      const { data } = await client.post("/auth/login", { email, password });
      // const { data } = await client.get("/auth2/test-login", { email, password });
      
      // сервер возвращает: user, abilities, scopes, currentPropertyId, token?
      const newSession = {
        user: data.user,
        abilities: data.abilities || [],
        properties: data.properties || [],
        currentPropertyId: data.currentPropertyId || null,
      };

      if (data.token) setToken(data.token); // Bearer-вариант
      setSession(newSession);
      //localStorage.setItem("auth:session", JSON.stringify(newSession));
      setAuthReady(true);
      console.log(newSession);
      return { ok: true };

    } catch (e) {
      console.log(e);
      setError(e.response?.data?.error || e.message);
      return { ok: false, error: e.message };
      

    } finally {
      setLoading(false);
    }
  }

  const logout = async() => {
    const { killtoken } = await client.post("/auth/logout");
    console.log("killtoken: ", killtoken);
    setSession(null);
    localStorage.removeItem("token");
  }

  const setCurrentPropertyId = (propertyId) => {
    const updated = { ...session, currentPropertyId: propertyId };
    setSession(updated);
    localStorage.setItem("auth:session", JSON.stringify(updated));
  };

  const isAuthenticated = !!session?.user;

  const value = useMemo(() => ({
    user: session?.user || null,
    abilities: session?.abilities || [],
    scopes: session?.scopes || {},
    currentPropertyId: session?.currentPropertyId || null,
    loading, error,
    login, logout, setCurrentPropertyId,
    isAuthenticated, authReady
  }), [session, loading, error]);

  // const value = { user, login, logout, authReady, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
