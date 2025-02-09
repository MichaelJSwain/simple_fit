import { useContext, useState } from "react"
import { AuthContext } from "../AuthContextProvider"
import FixedButton from "./FixedButton";
import WorkoutActiveView from "./WorkoutActiveView";

export const CustomWorkoutView = ({onCreateWorkoutClick, toggleModal}) => {
    const [isShowingCustomWorkoutDetailView, setIsShowingCustomWorkoutDetailView] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(undefined);
    const [isWorkoutActive, setIsWorkoutActive] = useState(false);

    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <>
            {(!isShowingCustomWorkoutDetailView && !isWorkoutActive) && 
            <>
            <button onClick={toggleModal}>Close</button>
                            <h1>custom workout view</h1>
            {user.customWorkouts.map(workout => {
                return <p onClick={() => {
                    setIsShowingCustomWorkoutDetailView(true)
                    setSelectedWorkout(workout)
                }} key={workout._id}>{workout.name || "custom workout"}</p>
            })}
            <FixedButton clickFunc={onCreateWorkoutClick} text="Create workout"/>
            </>}
            {isShowingCustomWorkoutDetailView &&
                <>
                    <button onClick={() => {
                        setIsShowingCustomWorkoutDetailView(false)
                        setSelectedWorkout(undefined)
                        }}>back</button>
                    <h1>{selectedWorkout.name || "custom workout"}</h1>
                    {selectedWorkout.trainingSet.map(exercise => {
                        return <p key={exercise._id}>{exercise.name}</p>
                    })}
                    <FixedButton clickFunc={() => {
                        console.log("activating workout")
                        setIsWorkoutActive(true);
                        setIsShowingCustomWorkoutDetailView(false);
                        }} text="Start Workout"/>
                </>
            }

            {isWorkoutActive && 
                <WorkoutActiveView workout={selectedWorkout} handleWorkoutCancel={() => setIsWorkoutActive(false)}/>
            }
        </>
    )
}