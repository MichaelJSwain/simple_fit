const FixedButton = ({clickFunc, text, disabled = false}) => {
    return (
        <div className="filters_button_container">
            <button style={{opacity: disabled ? "0.5" : "1"}} className='primaryCta' onClick={clickFunc}>{text}</button>
        </div>
    )
}

export default FixedButton;