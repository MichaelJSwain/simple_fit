import { useContext, useState } from 'react'
import '../App.css'
import LoginForm from '../LoginForm.jsx';
import RegisterForm from '../RegisterForm.jsx';
import axios from 'axios';
import { AuthContext } from '../AuthContextProvider.jsx';

const StartScreen = () => {
    const [modalActive, setModalActive] = useState(false);
    const [currentForm, setCurrentForm] = useState('login');
    const [user, setUser] = useState();
    const authContext = useContext(AuthContext);
    
    
    return (
        <>
        <div className='startScreen'>
          <div className='screen_content_container'>
            <div className='startScreen_textContainer'>
              <h1 onClick={authContext.login}>SIMPLE-FIT</h1>
              <button className='primaryCta' onClick={() => {setModalActive(!modalActive)}}>Login</button>
            </div>
          </div>
          <div className={modalActive ? 'modalContainer active' : 'modalContainer'}>
            <div>
          <button onClick={() => {setModalActive(!modalActive)}}>X</button>
  
  
          <div className='formContainer'>
            
            {currentForm === "login" ? (
              <>
                <LoginForm toggleModal={setModalActive} setUser={setUser}/>
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
        </div>
        </div>
  

      </>
    )
}

export default StartScreen;