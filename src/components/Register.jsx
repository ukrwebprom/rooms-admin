import { useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Stack, TextField, Typography, Button, IconButton, InputAdornment  } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterForm() {
  const {login} = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
    
  const toggle = () => setShow(s => !s);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await client.post("/auth/register", form);
      console.log(res);
      login(res.data);
    } catch (err) {
      setError("Ошибка: возможно email уже занят.");
    }
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField label="Name" type="text" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} required />
      <TextField label="Email" type="email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
      <TextField label="Пароль" type={show ? "text" : "password"} value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required 
              slotProps={{
              input: {
              endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={toggle}
                onMouseDown={(e) => e.preventDefault()} // чтобы не терять фокус
                edge="end"
                aria-label={show ? "Скрыть пароль" : "Показать пароль"}
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
            ),
            },
            }}
            />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" fullWidth>Sign Up</Button>
    </Stack>
  );
}