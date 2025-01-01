const WorkoutDetail = ({value, label}) => {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{height: "40px", width: "40px", borderRadius: "50%", border: "1px solid black"}}></div>
            <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                <span>{value}</span>
                <span>{label}</span>
            </div>
        </div>
    )
}

export default WorkoutDetail;