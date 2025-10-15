import { useState, useEffect, useRef } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import { useAuth } from "../context/AuthContext";
import { Paper, Typography, Link } from "@mui/material";

export default function AuthForm() {
    const [action, setAction] = useState('Login');
    const {loginWithGoogle} = useAuth();


        const googleBtnRef = useRef(null);
        const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
          // Инициализируем Google Identity Services
      useEffect(() => {
        if (!window.google || !GOOGLE_CLIENT_ID || !googleBtnRef.current) return;
    
        /* global google */
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response) => {
            try {
              const data = await loginWithGoogle(response.credential); // ID-token
              if (data?.error) setError(data.error);
            } catch (e) {
              console.error(e);
              setError("Google sign-in failed");
            }
          },
          // Доп. защита от replay-атак (по желанию)
          nonce: crypto.randomUUID(),
        });
    
        google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "pill",
          text: "signin_with", // автолокализация
        });
    
        // Опционально: One Tap (если захочешь)
        // google.accounts.id.prompt();
      }, [GOOGLE_CLIENT_ID, loginWithGoogle]);

    return (
        <Paper sx={{ p: 4, width: 380 }}>

        
        {action === 'Login' ? 
        (
            <>
            <Typography variant="h5" mb={2}>Login</Typography>
            <LoginForm />
            <Typography variant="body2" mt={2}>I don't have an account yet{" "}
                <Link
                    component="button"
                    type="button"
                    onClick={() => setAction("Register")}
                    underline="hover"
                    >
                    Sign Up
                </Link>
            </Typography>
            </>
        ):
        (
            <>
            <Typography variant="h5" mb={2}>Sign Up</Typography>
            <RegisterForm />
            <Typography variant="body2" mt={2}>I already have an account{" "}
                <Link
                    component="button"
                    type="button"
                    onClick={() => setAction("Login")}
                    underline="hover"
                    >
                    Login
                </Link>
            </Typography>
            </>
        )}

      {/* сюда отрендерится кнопка Google */}
      <div ref={googleBtnRef} style={{ display: "flex", justifyContent: "center", marginTop:"15px" }} />
        </Paper>
    )
}