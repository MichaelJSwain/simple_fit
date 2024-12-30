const WorkoutFilterItem = ({handleClick, classList, id, name, label}) => {
    return (
        <li style={{listStyle: "none", padding: "10px", margin: "0 5px 5px 0", fontSize: "12px"}} className={classList} onClick={handleClick} id={id} name={name}>{label}</li>
    )
}

export default WorkoutFilterItem;