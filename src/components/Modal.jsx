const Modal = ({modalActive, children}) => {
    return (
        <div className={modalActive ? 'modalContainer active' : 'modalContainer'}>
            {modalActive && children}
        </div>
    )
};

export default Modal;