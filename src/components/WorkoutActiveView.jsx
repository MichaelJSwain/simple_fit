import {useContext, useState } from "react";
import Countdown from "./Countdown";
import WorkoutCompletedView from "./WorkoutCompletedView";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";
import axios from "axios";
import { AuthContext } from "../AuthContextProvider";

const WorkoutActiveView = ({workout, handleWorkoutCancel}) => {
    const [trainingSet, setTrainingSet] = useState(workout.trainingSet);
    const [currentExercise, setCurrentExercise] = useState(0);
    const [showingCountdown, setShowingCountdown] = useState(true);
    const [showingInstructions, setShowingInstructions] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const handleWorkoutComplete = () => {
        axios.post("http://localhost:8080/exerciseApp/api/workouts/completed", {
            userId: authContext.user._id,
            workoutId: workout._id
        })
        .then(() => {
            console.log("persisted workout completion");
        })
        .catch(e => {
            console.log("error trying to persist workout completion");
        })
    }

    const incrementExercise = () => {
        if (currentExercise === (trainingSet.length - 1)) {
            handleWorkoutComplete();
            setIsCompleted(true);
        } else {
            setCurrentExercise(currVal => currVal + 1)
        }
    }

    const endWorkout = () => {
        console.log("WORKOUT ENDED!!");
        navigate("/");
    }

    return (
        <>
            {showingCountdown && <Countdown num={3} handleCountdownFinish={() => setShowingCountdown(false)}/>}
            {(trainingSet.length && !showingCountdown && !isCompleted) && (
                <div className="MainLayout-component">
                    <button onClick={handleWorkoutCancel}>X</button>
                    <h4 style={{textAlign: "center"}}>{trainingSet[currentExercise].name}</h4>

                    <Timer key={trainingSet[currentExercise]._id} duration={trainingSet[currentExercise]} handleTimerComplete={incrementExercise}/>

                    {showingInstructions && <div>
                        <ul>
                        {trainingSet[currentExercise].instructions.map(i => {
                            return <li>{i}</li>
                        })}
                        </ul>
                    </div>}
                    
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                            {!!trainingSet[currentExercise].instructions.length && <button onClick={() => setShowingInstructions(!showingInstructions)}>Instructions</button>}
                        </div>
                        <div>
                            <button onClick={incrementExercise}>Next</button>
                        </div>
                    </div>
                </div>
            )}
            {
                isCompleted && <WorkoutCompletedView clickFunc={endWorkout} workout={workout}/>
            }
        </>
    )
}

export default WorkoutActiveView;