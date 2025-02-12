export const ExerciseListItem = ({classes, item, clickFunc}) => {
    return (
        <div classes={classes} key={item._id} style={{display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid black", padding: "10px 0"}} onClick={clickFunc}>
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{height: "40px", width: "40px", background: "grey", marginRight: "10px"}}></div>
                <h4>{item.name}</h4>
            </div>
            <div style={{height: "15px", width: "15px", background: item.isSelected ? "orange" : "grey", borderRadius: "30px"}}></div>
        </div>
    )
}