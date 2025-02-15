const WorkoutGoals = ({goals}) => {
    return (
        <div style={{display: "flex", flexWrap: "wrap", rowGap: "5px"}}>
            {goals.map(goal => {
                return <div key={goal} style={{marginRight: "5px", background: "grey", padding: "5px", fontSize: "12px", color: "black"}}>{goal}</div>
            })}
        </div>
    )
}

export default WorkoutGoals;