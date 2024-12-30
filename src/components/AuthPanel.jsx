import { useState } from "react";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

const AuthPanel = () => {
    const [currentForm, setCurrentForm] = useState("login");

    return (
        <>
            {currentForm === "login" ?
            <>
                <LoginForm />
                <button onClick={() => setCurrentForm('register')}>Register</button>
            </> :
            <>
                <RegisterForm />
                <button onClick={() => setCurrentForm('login')}>Login</button>
            </>
            }
        </>
    )
}

export default AuthPanel;