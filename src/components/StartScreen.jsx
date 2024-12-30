import { useContext, useState } from 'react'
import '../App.css'
import LoginForm from '../LoginForm.jsx';
import RegisterForm from '../RegisterForm.jsx';
import axios from 'axios';
import { AuthContext } from '../AuthContextProvider.jsx';
import Modal from './Modal.jsx';
import AuthPanel from './AuthPanel.jsx';

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
          <Modal modalActive={modalActive}>
            <div style={{padding: "20px", height: "100%"}}>
            <button onClick={() => {setModalActive(!modalActive)}}>X</button>
    
    
            <div className='formContainer'>
              <AuthPanel />
            </div>
            </div>
          </Modal>
        </div>
  

      </>
    )
}

export default StartScreen;