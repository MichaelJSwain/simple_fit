import { useRef } from "react";
import WorkoutDetails from "./WorkoutDetails";

const WorkoutCompletedView = ({clickFunc, workout}) => {
    const workoutDetailsRef = useRef([
        {value: workout.duration, label: "Duration"},
        {value: workout.difficulty, label: "Difficulty"},
        {value: workout.type, label: "Type"},
    ]);

    return (
        <div className="MainLayout-component" style={{textAlign: "center", background: "#fe7000", height: "100vh" }}>
            <h1>Well Done!</h1>
            <p>You've completed the following workout</p>
            <p>{workout.name}</p>
            <WorkoutDetails details={workoutDetailsRef.current} />
            <button onClick={clickFunc}>Home</button>
        </div>
    )
}

export default WorkoutCompletedView;