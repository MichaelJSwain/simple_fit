import axios from "axios";
import { useEffect, useState } from "react";
import LoadingView from "./LoadingView";
import { ExerciseList } from "./ExerciseList";
import FixedButton from "./FixedButton";

export const ExerciseListView = ({onAddWorkout, onBackButtonClick}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [exerciseList, setExerciseList] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filteredExercises, setFilteredExercises] = useState([]);
    
    const handleChange = (e) => {
        setSearchValue(e.target.value);  
    }

    console.log("filtered = ", filteredExercises)

    const handleSearchFilter = () => {
        const filtered = exerciseList.filter(exercise => exercise.name.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredExercises(filtered);
    }

    useEffect(handleSearchFilter, [searchValue, exerciseList]);

    const fetchExercises = async () => {
        setIsLoading(true);
        axios.get("http://localhost:8080/exerciseApp/api/exercises")
        .then(function (response) {
            console.log("RESPONSE = ", response.data);
            setExerciseList(response.data);
            setFilteredExercises(response.data);
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

        const ex = exerciseList.find(exer => exer._id == selectedExercise._id);
        const copy = {...ex};
        copy.isSelected = !copy.isSelected;
        console.log("copy => ", copy)
        
        const copyExercises = exerciseList.map(exercise => {
            return exercise._id == selectedExercise._id ? copy : exercise;
        });
        setExerciseList(copyExercises);
    }

    const handleButtonClick = () => {
        console.log("handling button click");
        if (selectedExercises.length) {
            console.log("adding selected exercises = ", selectedExercises);
            onAddWorkout(selectedExercises);
        }
    }

    return (
        <>
            {isLoading && <LoadingView></LoadingView>}
            {exerciseList.length && 
            <div>
                <button onClick={onBackButtonClick}>Back</button>   
                <h1>Exercise List</h1>
                <input placeholder="search" style={{borderRadius: "30px", padding: "15px 25px", width: "80%"}} value={searchValue} onChange={handleChange}></input>
                <ExerciseList exerciseList={filteredExercises} onExerciseSelected={(exercise) => handleExerciseSelected(exercise)} />
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