import { useState } from "react";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

const AuthPanel = () => {
    const [currentForm, setCurrentForm] = useState("login");

    return (
        <div className='formContainer'>
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
        </div>
    )
}

export default AuthPanel;