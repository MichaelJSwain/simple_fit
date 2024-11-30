import { useContext, useState } from "react"
import axios from "axios";
import { AuthContext } from "./AuthContextProvider";

const RegisterForm = ({toggleModal}) => {
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
        setGeneralError(false);
        setEmailError(false);
        setPasswordError(false);
        e.preventDefault();

        if (!email) {
          setEmailError(true);
        }
        if (!password) {
          setPasswordError(true);
        }
        if (email && password) {
          authContext.register(email, password, setGeneralError);
        }
  }
    
    return (
        <>
            <form onSubmit={handleSubmit} className='form'>
              <div className='formSection'>
                <label className='formLabel' htmlFor="email">E-mail:</label>
                <input className='formInput' id="email" name="email" onChange={handleChange} value={email}></input>
                {emailError && <h4 style={{color: 'red'}}>Please type a valid email</h4>}
              </div>
              <div className='formSection'>
                <label className='formLabel' htmlFor="password">Password:</label>
                <input className='formInput' id="password" name="password" onChange={handleChange} value={password}></input>
                {passwordError && <h4 style={{color: 'red'}}>Please type your password</h4>}
              </div>
              <button className='primaryCta'>Register</button>
            </form>
        </>
    )
}

export default RegisterForm;