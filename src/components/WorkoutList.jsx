import WorkoutListItem from "./WorkoutListItem"

const WorkoutList = ({workoutList}) => {
    return (
        <div className="WorkoutList">
            <div className="ListCount_container" style={{margin: '20px 0'}}>
                <span className="ListCount_text">{workoutList.length} Results</span>
            </div>
            {workoutList.map(workout => {
                return <WorkoutListItem key={workout._id} workout={workout}/>
            })}
        </div>
    )
};

export default WorkoutList;