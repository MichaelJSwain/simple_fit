import { useContext, useState } from "react"
import axios from "axios";
import { AuthContext } from "./AuthContextProvider";
import { errorMessages } from "./errorMessages";

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
          setEmailError(true);
        }
        if (!password) {
          setPasswordError(true);
        }
        if (email && password) {
          authContext.register(email, password, () => {setGeneralError(errorMessages.networkError)});
        }
  }
    
    return (
        <>
            {generalError && <h4 style={{color: 'red'}}>{generalError}</h4>}
            <form onSubmit={handleSubmit} className='form'>
              <div className='formSection'>
                <label className='formLabel' htmlFor="email">E-mail:</label>
                <input className='formInput' id="email" name="email" onChange={handleChange} value={email}></input>
                {emailError && <h4 style={{color: 'red', margin: "0"}}>{errorMessages.missingEmail}</h4>}
              </div>
              <div className='formSection'>
                <label className='formLabel' htmlFor="password">Password:</label>
                <input className='formInput' id="password" name="password" onChange={handleChange} value={password}></input>
                {passwordError && <h4 style={{color: 'red', margin: "0"}}>{errorMessages.missingPassword}</h4>}
              </div>
              <button className='primaryCta'>Register</button>
            </form>
        </>
    )
}

export default RegisterForm;