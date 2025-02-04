import axios from "axios";
import { useEffect, useRef, useState } from "react"
import LoadingView from "./LoadingView";


export const WorkoutBuilderView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [exerciseList, setExerciseList] = useState([]);
    const workoutNameRef = useRef('');

    const fetchExercises = async () => {
        setIsLoading(true);
        axios.get("http://localhost:8080/exerciseApp/api/exercises")
        .then(function (response) {
            console.log("RESPONSE = ", response.data);
            setExerciseList(response.data);
            setIsLoading(false);
          })
          .catch(function (error) {
            setIsLoading(true);
            // handleError(true);
          });
    }

    useEffect(() => {
        fetchExercises();
    }, []);

    return (
        <div>
            <h1>Workout Builder</h1>
            {isLoading && <LoadingView />}
            {exerciseList.map(exercise => {
                return <h2 key={exercise._id}>{exercise.name}</h2>
            })}
        </div>
    )   
}