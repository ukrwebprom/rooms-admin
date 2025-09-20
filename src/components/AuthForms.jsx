import { useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import './AuthForms.css';

export default function AuthForm() {
    const [action, setAction] = useState('Login');

    return (
        <div className="base">

        
        {action === 'Login' ? 
        (
            <>
            <h1>Login</h1>
            <LoginForm />
            <p onClick={() => setAction('Register')} className='switchForm'>I don't have an account yet</p>
            </>
        ):
        (
            <>
            <h1>Register</h1>
            <RegisterForm />
            <p onClick={() => setAction('Login')} className='switchForm'>I already have an account</p>
            </>
        )}

        </div>
    )
}