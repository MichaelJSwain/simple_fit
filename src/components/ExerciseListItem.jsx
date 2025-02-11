export const ExerciseListItem = ({classes, item, clickFunc}) => {
    return (
        <div classes={classes} key={item._id} style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} onClick={clickFunc}>
            {item.name}
            <div style={{height: "15px", width: "15px", background: item.isSelected ? "orange" : "grey", borderRadius: "30px"}}></div>
        </div>
    )
}