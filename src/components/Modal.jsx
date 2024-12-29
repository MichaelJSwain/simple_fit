const Modal = ({modalActive, children}) => {
    return (
        <div className={modalActive ? 'modalContainer active' : 'modalContainer'}>
            {children}
        </div>
    )
};

export default Modal;