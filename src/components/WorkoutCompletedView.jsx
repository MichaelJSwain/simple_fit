import { useEffect } from "react";

const WorkoutCompletedView = ({clickFunc, workout}) => {

    return (
        <div className="MainLayout-component" style={{textAlign: "center", background: "#fe7000", height: "100vh" }}>
            <h1>Well Done!</h1>
            <p>You've completed the following workout</p>
            <p>{workout.name}</p>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <div style={{height: "40px", width: "40px", borderRadius: "50%", border: "1px solid black"}}></div>
                            <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                                <span>{workout.duration}</span>
                                <span>duration</span>
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <div style={{height: "40px", width: "40px", borderRadius: "50%", border: "1px solid black"}}></div>
                            <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                                <span>{workout.difficulty}</span>
                                <span>Difficulty</span>
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <div style={{height: "40px", width: "40px", borderRadius: "50%", border: "1px solid black"}}></div>
                            <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                                <span>{workout.type}</span>
                                <span>type</span>
                            </div>
                        </div>
                    </div>
            <button onClick={clickFunc}>Home</button>
        </div>
    )
}

export default WorkoutCompletedView;