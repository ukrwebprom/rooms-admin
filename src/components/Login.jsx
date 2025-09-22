import { useState, useEffect } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Stack, TextField, Typography, Button, IconButton, InputAdornment  } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginForm() {
    const {login} = useAuth();
    const [form, setForm] = useState({email:'', password:''});
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    
    const toggle = () => setShow(s => !s);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const res = await client.post("/auth/login", form);
      login(form);
    } catch (err) {
      setError("Неверный email или пароль");
    }
    };

    return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
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
      <Button type="submit" variant="contained" fullWidth>Login</Button>
    </Stack>
    );
        
}