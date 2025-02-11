import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"
import LoadingView from "./LoadingView";
import FixedButton from "./FixedButton";
import { ExerciseListView } from "./ExerciseListView";
import { WorkoutBuilderConfirmationView } from "./WorkoutBuilderConfirmationView";
import { AuthContext } from "../AuthContextProvider";
import { CustomWorkoutView } from "./CustomWorkoutView";

export const WorkoutBuilderView = ({toggleModal}) => {
    const [isShowingCustomWorkoutView, setIsShowingCustomWorkoutView] = useState(true);
    const [isShowingExerciseListView, setIsShowingExerciseListView] = useState(false);
    const [isShowingConfirmationView, setIsShowingConfirmationView]  = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowingSuccessMessage, setIsShowingSuccessMessage] = useState(false);
    const [isShowingErrorMessage, setIsShowingErrorMessage] = useState(false);
    const [workout, setWorkout] = useState([]);

    const authContext = useContext(AuthContext);

    const handleAddWorkout = (selectedExercises) => {
        console.log(selectedExercises);
        setWorkout([...workout, ...selectedExercises]);
        setIsShowingExerciseListView(false);
        setIsShowingConfirmationView(true);
    }

    const handleBackToExerciseList= () => {
        setIsShowingConfirmationView(false);
        setIsShowingExerciseListView(true);
    }

    const handleSaveWorkout = (workoutName) => {
        console.log("saving workout");
        setIsShowingConfirmationView(false);
        setIsLoading(true)
        axios.post('http://localhost:8080/exerciseApp/api/workouts', {
            workout: {
                user_id: authContext.user._id,
                name: workoutName,
                exercises: workout
            }
          })
          .then(function (response) {
            console.log(response)
            setIsLoading(false);
            setIsShowingSuccessMessage(true);
          })
          .catch(function (error) {
            console.log("error trying to create workout => ", error);
            setIsLoading(false);
            setIsShowingErrorMessage(true);
            // handleError(true);
          });
    }

    const handleCreateWorkoutClick = () => {
        console.log("handling create workout")
        setIsShowingCustomWorkoutView(false);
        setIsShowingExerciseListView(true);
    }

    return (
        <div>
            {isShowingCustomWorkoutView && 
                <CustomWorkoutView toggleModal={toggleModal} onCreateWorkoutClick={handleCreateWorkoutClick}/>
            }
            {!isShowingCustomWorkoutView && 
                <>
                        {isLoading && <LoadingView></LoadingView>}
                    {isShowingSuccessMessage && <>
                        <h4>Successfully created your new workout!</h4>
                        <button onClick={toggleModal}>Back to workouts</button>
                    </>}
                    {isShowingErrorMessage && <>
                        <h4>Unable to create your workout. Please try again later</h4>
                        <button onClick={toggleModal}>Back to workouts</button>
                    </>}
                    {!isLoading && <>
                               
                        {isShowingExerciseListView && <ExerciseListView onAddWorkout={(selectedExercises) => handleAddWorkout(selectedExercises)} onBackButtonClick={() => {
                                            setIsShowingCustomWorkoutView(true);
                                            setIsShowingExerciseListView(false);
                                        }}></ExerciseListView>}
                        {isShowingConfirmationView && <WorkoutBuilderConfirmationView onSaveWorkout={handleSaveWorkout} clickFunc={handleBackToExerciseList} exerciseList={workout}></WorkoutBuilderConfirmationView>}          
                    </>}
                </>}

        </div>
    )   
}