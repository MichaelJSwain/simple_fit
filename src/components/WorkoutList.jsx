import ListItem from "./ListItem"

const WorkoutList = ({workoutList}) => {
    return (
        <div className="WorkoutList">
            <div className="ListCount_container" style={{margin: '20px 0'}}>
                <span className="ListCount_text">{workoutList.length} Results</span>
            </div>
            {workoutList.map(workout => {             
                return <ListItem key={workout._id} isLinked={true} id={workout._id} title={workout.name} info={[workout.difficulty, workout.duration, workout.equipment, workout.format]}/>
            })}
        </div>
    )
};

export default WorkoutList;