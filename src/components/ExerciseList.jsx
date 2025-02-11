import { useEffect, useState } from "react"
import { ExerciseListItem } from "./ExerciseListItem";

export const ExerciseList = ({selectedExercises, exerciseList, onExerciseSelected}) => {
    const [searchValue, setSearchValue] = useState("");
    const [filteredExercises, setFilteredExercises] = useState(exerciseList);
    
    const handleChange = (e) => {
        setSearchValue(e.target.value);  
    }

    const handleSearchFilter = () => {
        const filtered = exerciseList.filter(exercise => exercise.name.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredExercises(filtered);
    }

    useEffect(handleSearchFilter, [searchValue]);

    return (
        <div>
            <input placeholder="search" style={{borderRadius: "30px", padding: "15px 25px", width: "80%"}} value={searchValue} onChange={handleChange}></input>
            {filteredExercises.length ? filteredExercises.map(exercise => {
                return <ExerciseListItem key={exercise._id} item={exercise} onExerciseSelected={() => onExerciseSelected(exercise)}/>
                // return <div key={exercise._id} onClick={() => onExerciseSelected(exercise)}>{exercise.name}</div>
            }) : <div>Sorry, there were no results found. Try another search term!</div>}
        </div>
    )
}