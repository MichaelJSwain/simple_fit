const FixedButton = ({clickFunc, text}) => {
    return (
        <div className="filters_button_container">
            <button className='primaryCta' onClick={clickFunc}>{text}</button>
        </div>
    )
}

export default FixedButton;