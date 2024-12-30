import { useState } from 'react'
import '../App.css'
import Modal from './Modal.jsx';
import AuthPanel from './AuthPanel.jsx';

const StartScreen = () => {
    const [modalActive, setModalActive] = useState(false);  
    
    return (
        <>
        <div className='startScreen'>
          <div className='screen_content_container'>
            <div className='startScreen_textContainer'>
              <h1>SIMPLE-FIT</h1>
              <button className='primaryCta' onClick={() => {setModalActive(!modalActive)}}>Login</button>
            </div>
          </div>
          <Modal modalActive={modalActive}>
            <div style={{padding: "20px", height: "100%"}}>
              <button onClick={() => {setModalActive(!modalActive)}}>X</button>
              <AuthPanel />
            </div>
          </Modal>
        </div>
  

      </>
    )
}

export default StartScreen;