import axios from "axios";
import { useEffect, useState } from "react";
import LoadingView from "./LoadingView";
import { ExerciseList } from "./ExerciseList";
import FixedButton from "./FixedButton";

export const ExerciseListView = ({selectedExercises, onExerciseSelected, onAddWorkout}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [exerciseList, setExerciseList] = useState([]);    

    const fetchExercises = async () => {
        setIsLoading(true);
        axios.get("http://localhost:8080/exerciseApp/api/exercises")
        .then(function (response) {
            console.log("RESPONSE = ", response.data);
            setExerciseList(response.data);
            setIsLoading(false);
          })
          .catch(function (error) {
            setIsLoading(false);
            // handleError(true);
          });
    }

    useEffect(() => {
        fetchExercises();
    }, []);

    // const handleExerciseSelected = (selectedExercise) => {
    //     console.log("selected exercise = ", selectedExercise);
    //     if (selectedExercises.length) {
    //         let filtered = selectedExercises.filter(exercise => exercise._id != selectedExercise._id);
    //         if (filtered.length === selectedExercises.length) {
    //             setSelectedExercises([...selectedExercises, selectedExercise]);
    //         } else {
    //             setSelectedExercises(filtered);
    //         }
    //     } else {
    //         setSelectedExercises([...selectedExercises, selectedExercise]);
    //     }
    // }

    const handleButtonClick = () => {
        console.log("handling button click");
        if (selectedExercises.length) {
            onAddWorkout(selectedExercises);
        }
    }

    return (
        <>
            {isLoading && <LoadingView></LoadingView>}
            {exerciseList.length && 
            <div>
                <h1>Exercise List</h1>
                <ExerciseList selectedExercises={selectedExercises} exerciseList={exerciseList} onExerciseSelected={(exercise) => onExerciseSelected(exercise)} />
                <FixedButton 
                    clickFunc={handleButtonClick} 
                    text={selectedExercises.length ? `Add ${selectedExercises.length} exercises` : "Add exercises"}
                    disabled={selectedExercises.length ? false : true}
                />
            </div>
            }
        </>
    )
}