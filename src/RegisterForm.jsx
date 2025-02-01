import { useContext, useState } from "react"
import axios from "axios";
import { AuthContext } from "./AuthContextProvider";
import { errorMessages } from "./errorMessages";
import { Alert } from "./components/Alert";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [generalError, setGeneralError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const authContext = useContext(AuthContext);

    const handleChange = (e) => {
        if (e.target.name === "email") {
          setEmail(currVal => {
            return e.target.value;
          });
        } else {
          setPassword(currVal => {
            return e.target.value;
          });
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        setGeneralError(false);
        setEmailError(false);
        setPasswordError(false);
      
        if (!email) {
          setEmailError(errorMessages.missingEmail);
        }
        if (!password) {
          setPasswordError(errorMessages.missingPassword);
        }
        if (email && password) {
          authContext.register(email, password, () => {setGeneralError(errorMessages.networkError)});
        }
  }
    
    return (
        <>
            {generalError && <Alert>{generalError}</Alert>}
            <form onSubmit={handleSubmit} className='form'>
              <div className='formSection'>
                <label className='formLabel' htmlFor="email">E-mail:</label>
                <input className='formInput' style={emailError ? {borderColor: "red"} : {borderColor: "black"}} id="email" name="email" onChange={handleChange} value={email}></input>
                {emailError && <Alert>{emailError}</Alert>}
              </div>
              <div className='formSection'>
                <label className='formLabel' htmlFor="password">Password:</label>
                <input className='formInput' style={passwordError ? {borderColor: "red"} : {borderColor: "black"}} id="password" name="password" onChange={handleChange} value={password}></input>
                {passwordError && <Alert>{passwordError}</Alert>}
              </div>
              <button className='primaryCta'>Register</button>
            </form>
        </>
    )
}

export default RegisterForm;