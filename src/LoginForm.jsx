import { useState } from "react"
import axios from "axios";

const LoginForm = ({toggleModal}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [generalError, setGeneralError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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

            console.log("handling login");
            if (!email) {
              console.log("Please enter an email");
              setEmailError(true);
            }
            if (!password) {
              console.log("Please enter your password");
              setPasswordError(true);
            }
            if (email && password) {
              axios.post('http://localhost:8080/exerciseApp/api/user/login', {
                username: email,
                password: password
              })
              .then(function (response) {
                console.log(response);
                toggleModal(false);
              })
              .catch(function (error) {
                console.log(error);
                console.log("invalid email or password");
                setGeneralError(true);
              });
            }
      }
    
    return (
        <>
            {generalError && <h4 style={{color: 'red'}}>Invalid username or password</h4>}
            <form onSubmit={(e) => handleSubmit(e)} className='form'>
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
                <button className='primaryCta'>Login</button>
            </form>
        </>
    )
}

export default LoginForm;