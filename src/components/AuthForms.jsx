import { useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import { Paper, Typography, Link } from "@mui/material";

export default function AuthForm() {
    const [action, setAction] = useState('Login');
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

        </Paper>
    )
}