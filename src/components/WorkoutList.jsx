import WorkoutListItem from "./WorkoutListItem"

const WorkoutList = ({workoutList}) => {
    return (
        <div className="WorkoutList">
            {workoutList.map(workout => {
                return <WorkoutListItem key={workout._id} workout={workout}/>
            })}
        </div>
    )
};

export default WorkoutList;