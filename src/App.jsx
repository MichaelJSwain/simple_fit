import { useState } from 'react'
import './App.css'
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import axios from 'axios';

function App() {
  const [modalActive, setModalActive] = useState(false);

  const [currentForm, setCurrentForm] = useState('login');

  const handleLogin = (email, password) => {
    console.log("handling login");
    if (!email) {
      console.log("Please enter an email");
    }
    if (!password) {
      console.log("Please enter your password");
    }
    if (email && password) {
      axios.post('http://localhost:8080/exerciseApp/api/user/login', {
        username: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
        setModalActive(false);
      })
      .catch(function (error) {
        console.log(error);
        console.log("invalid email or password");
      });
    }

  }

  const handleRegister = (email, password) => {
    console.log("handling register");
  }

  return (
    <>
      <div className='startScreen'>
        <div className='startScreen_textContainer'>
          <h1>SIMPLE-FIT</h1>
          <button className='primaryCta' onClick={() => {setModalActive(!modalActive)}}>Login</button>
        </div>
      </div>

      <div className={modalActive ? 'modalContainer active' : 'modalContainer'}>
        <button onClick={() => {setModalActive(!modalActive)}}>X</button>


        <div className='formContainer'>
          
          {currentForm === "login" ? (
            <>
              <LoginForm toggleModal={setModalActive}/>
              <button onClick={() => setCurrentForm('register')}>Register</button>
            </>
          ) : (
            <>
              <RegisterForm toggleModal={setModalActive}/>
              <button onClick={() => setCurrentForm('login')}>Login</button>
            </>
          )}
          
        </div>
      </div>
    </>
  )
}

export default App
