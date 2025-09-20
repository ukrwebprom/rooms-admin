import { useState } from "react";
import client from "../api/client";
import "./Forms.css";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post("/auth/register", form);
      setMessage("Регистрация успешна! Теперь можно войти.");
    } catch (err) {
      setMessage("Ошибка: возможно email уже занят.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
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
      {message && <p>{message}</p>}
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}