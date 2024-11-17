import { useState } from "react"
import axios from "axios";

const RegisterForm = ({toggleModal}) => {
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

        console.log("handling Register");
        if (!email) {
          console.log("Please enter an email");
          setEmailError(true);
        }
        if (!password) {
          console.log("Please enter your password");
          setPasswordError(true);
        }
        if (email && password) {
          axios.post('http://localhost:8080/exerciseApp/api/user/register', {
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
            <form onSubmit={handleSubmit} className='form'>
              <div className='formSection'>
                <label className='formLabel' htmlFor="email">E-mail:</label>
                <input className='formInput' id="email" name="email" onChange={handleChange} value={email}></input>
              </div>
              <div className='formSection'>
                <label className='formLabel' htmlFor="password">Password:</label>
                <input className='formInput' id="password" name="password" onChange={handleChange} value={password}></input>
              </div>
              <button className='primaryCta'>Register</button>
            </form>
        </>
    )
}

export default RegisterForm;