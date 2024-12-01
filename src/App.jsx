import { useContext, useState } from 'react'
import './App.css'
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import axios from 'axios';
import StartScreen from './components/StartScreen.jsx';
import AuthContextProvider, { AuthContext } from './AuthContextProvider.jsx';
import WorkoutListView from './components/WorkoutListView.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [currentForm, setCurrentForm] = useState('login');
  const authContext = useContext(AuthContext);
  console.log(authContext);

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
        setUser({
          username: 'dave'
        })
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
      <div className='app'>
        {authContext.user ? 
        <div style={{background: 'white', color: 'black'}}>
          <Navbar />
          <WorkoutListView/>
        </div> : 
        <StartScreen></StartScreen>}
      </div>
    
  )
}

export default App
