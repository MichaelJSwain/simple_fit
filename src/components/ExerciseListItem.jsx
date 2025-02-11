export const ExerciseListItem = ({item, onExerciseSelected}) => {
    return (
        <div key={item._id} onClick={onExerciseSelected}>{item.name}</div>
    )
}