import { useState, useEffect } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Forms.css";

export default function LoginForm() {
    const {isAuthenticated, authReady, login} = useAuth();
    const [form, setForm] = useState({email:'', password:''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    if (authReady && isAuthenticated) {
      navigate("/properties", { replace: true });
    }
    }, [authReady, isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await client.post("/auth/login", form);
      login(res.data);
    } catch (err) {
      setError("Неверный email или пароль");
    }
    };

    return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Войти</button>
      {error && <p style={{color:"red"}}>{error}</p>}
    </form>
    );
        
}