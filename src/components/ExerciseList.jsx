export const ExerciseList = ({selectedExercises, exerciseList, onExerciseSelected}) => {
    return (
        <div>
            <input placeholder="search" style={{borderRadius: "30px", padding: "15px 25px", width: "80%"}}></input>
            {exerciseList.map(exercise => {
                return <div key={exercise._id} onClick={() => onExerciseSelected(exercise)}>{exercise.name}</div>
            })}
        </div>
    )
}