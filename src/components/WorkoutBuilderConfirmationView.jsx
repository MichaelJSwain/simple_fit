import { useState } from "react"
import FixedButton from "./FixedButton"

export const WorkoutBuilderConfirmationView = ({onSaveWorkout, clickFunc, exerciseList}) => {
    const [workoutName, setWorkoutName] = useState("");

    const handleChange = (e) => {
        setWorkoutName(e.target.value);
    }

    return (
        <> 
            <button onClick={clickFunc}>Back to exercise list</button>
            <h1>Confirmation View</h1>
            <input onChange={handleChange} value={workoutName}></input>
            {exerciseList.map(exercise => {
                return <p key={exercise._id}>{exercise.name}</p>
            })}
            <FixedButton 
                clickFunc={() => onSaveWorkout(workoutName)}
                text="Save workout"
            />
        </>
    )
}