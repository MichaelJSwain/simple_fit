export const ExerciseList = ({selectedExercises, exerciseList, onExerciseSelected}) => {

    const getClassList = (exercise) => {

    }

    return (
        <div>
            {exerciseList.map(exercise => {
                return <div key={exercise._id} onClick={() => onExerciseSelected(exercise)}>{exercise.name}</div>
            })}
        </div>
    )
}