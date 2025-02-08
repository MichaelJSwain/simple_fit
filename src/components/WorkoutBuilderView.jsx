import axios from "axios";
import { useEffect, useRef, useState } from "react"
import LoadingView from "./LoadingView";
import FixedButton from "./FixedButton";
import { ExerciseListView } from "./ExerciseListView";
import { WorkoutBuilderConfirmationView } from "./WorkoutBuilderConfirmationView";


export const WorkoutBuilderView = ({toggleModal}) => {
    const [isShowingExerciseListView, setIsShowingExerciseListView] = useState(true);
    const [isShowingConfirmationView, setIsShowingConfirmationView]  = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowingSuccessMessage, setIsShowingSuccessMessage] = useState(false);
    const [isShowingErrorMessage, setIsShowingErrorMessage] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [workout, setWorkout] = useState([]);

    const handleExerciseSelected = (selectedExercise) => {
        console.log("selected exercise = ", selectedExercise);
        if (selectedExercises.length) {
            let filtered = selectedExercises.filter(exercise => exercise._id != selectedExercise._id);
            if (filtered.length === selectedExercises.length) {
                setSelectedExercises([...selectedExercises, selectedExercise]);
            } else {
                setSelectedExercises(filtered);
            }
        } else {
            setSelectedExercises([...selectedExercises, selectedExercise]);
        }
    }

    const handleAddWorkout = (selectedExercises) => {
        console.log(selectedExercises);
        setWorkout(selectedExercises);
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
                name: workoutName,
                exercises: selectedExercises
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

    return (
        <div>
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
                <button onClick={toggleModal}>Close</button>          
                {isShowingExerciseListView && <ExerciseListView selectedExercises={selectedExercises} onExerciseSelected={(exercise) => handleExerciseSelected(exercise)} onAddWorkout={(selectedExercises) => handleAddWorkout(selectedExercises)}></ExerciseListView>}
                {isShowingConfirmationView && <WorkoutBuilderConfirmationView onSaveWorkout={handleSaveWorkout} clickFunc={handleBackToExerciseList} exerciseList={selectedExercises}></WorkoutBuilderConfirmationView>}          
            </>}
        </div>
    )   
}