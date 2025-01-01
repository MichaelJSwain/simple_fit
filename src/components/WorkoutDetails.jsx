import WorkoutDetail from "./WorkoutDetail";

const WorkoutDetails = ({details}) => {
    console.log(details);
    return (
        <div style={{display: "flex", justifyContent: "space-around"}}>
            {details.map((detail, idx) => {
                return <WorkoutDetail key={idx} value={detail.value} label={detail.label} />
            })}
        </div>
    )
}

export default WorkoutDetails;