import { ExerciseListItem } from "./ExerciseListItem";

export const ExerciseList = ({exerciseList, onExerciseSelected}) => {
    return (
        <div>
            {exerciseList.length ? exerciseList.map(exercise => {
                return <ExerciseListItem 
                            classes={exercise.isSelected ? "itemSelected list-item" : "list-item"} 
                            key={exercise._id} 
                            item={exercise} 
                            clickFunc={() => onExerciseSelected(exercise)}
                        />
            }) : <div>Sorry, there were no results found. Try another search term!</div>}
        </div>
    )
}