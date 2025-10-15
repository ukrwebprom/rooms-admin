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
          properties: data.properties || {},
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
      
      const newSession = {
        user: data.user,
        abilities: data.abilities || [],
        properties: data.properties || [],
      };

      if (data.token) setToken(data.token); // Bearer-вариант
      setSession(newSession);
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

  const loginWithGoogle = async (idToken) => {
    const { data } = await client.post(
      "/auth/google",
      { id_token: idToken },
      { withCredentials: true }
    );
    console.log(data);
    if (data.token) setToken(data.token); 
    const newSession = {
        user: data.user,
        abilities: data.abilities || [],
        properties: data.properties || [],
      };
    setSession(data);
    setAuthReady(true);
    return data;
  };

  const logout = async() => {
    const { killtoken } = await client.post("/auth/logout");
    console.log("killtoken: ", killtoken);
    setSession(null);
    localStorage.removeItem("token");
  }

  const updatePropertyList = async() => {
    setLoading(true); setError(null);
    client
    .get('/properties/')
        .then(({ data }) => {
            const updatedProperties = data.map((p) => ({property_name:p.name, property_id:p.id}));
            setSession({...session, properties: updatedProperties});
            return true;
          })
        .catch((e) => { 
          setError(e.response?.data?.error || e.message);
          return { ok: false, error: e.message };
         })
        .finally(() => { setLoading(false); });
  }

  const isAuthenticated = !!session?.user;

  const value = useMemo(() => ({
    session,
    loading, error,
    login, logout, updatePropertyList, loginWithGoogle,
    isAuthenticated, authReady
  }), [session, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
