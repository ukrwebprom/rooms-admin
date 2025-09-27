import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

let refreshing = null;

export function setToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  r => r,
  async (err) => {
    const original = err.config;
    if (err.response?.status !== 401 || original._retry) throw err;

    refreshing = refreshing || axios.post("/auth/refresh", {}, { withCredentials: true })
    .then(res => {
    localStorage.setItem("token", res.data.token);
    return res.data.token;
    })
    .catch(err => {
      localStorage.removeItem("token");
      localStorage.removeItem("auth:session");
      refreshing = null; // очистка на ошибке
      throw err;
    });

    try {
      const newToken = await refreshing;
      refreshing = null;
      original.headers.Authorization = `Bearer ${newToken}`;
      return client(original); // повторяем исходный запрос
    } catch (e) {
      // редирект на /login здесь, если нужно
      throw err;
    }
  }
)

export default client;
