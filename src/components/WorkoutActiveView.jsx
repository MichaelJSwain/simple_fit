import {useState } from "react";
import Countdown from "./Countdown";
import WorkoutCompletedView from "./WorkoutCompletedView";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";

const WorkoutActiveView = ({workout}) => {
    const [trainingSet, setTrainingSet] = useState(workout.trainingSet);
    const [currentExercise, setCurrentExercise] = useState(0);
    const [showingCountdown, setShowingCountdown] = useState(true);
    const [showingInstructions, setShowingInstructions] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();

    const incrementExercise = () => {
        if (currentExercise === (trainingSet.length - 1)) {
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
                <div>
                    <h4>{trainingSet[currentExercise].name}</h4>

                    <Timer key={trainingSet[currentExercise]._id} duration={trainingSet[currentExercise]} handleTimerComplete={incrementExercise}/>

                    {showingInstructions && <div>
                        {trainingSet[currentExercise].instructions}
                    </div>}
                    
                    <div>
                        {!!trainingSet[currentExercise].instructions.length && <button onClick={() => setShowingInstructions(!showingInstructions)}>Instructions</button>}
                        <button onClick={incrementExercise}>Next</button>
                    </div>
                </div>
            )}
            {
                isCompleted && <WorkoutCompletedView clickFunc={endWorkout}/>
            }
        </>
    )
}

export default WorkoutActiveView;