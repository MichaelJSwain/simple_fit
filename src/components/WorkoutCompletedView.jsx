import { useEffect } from "react";

const WorkoutCompletedView = ({clickFunc}) => {

    return (
        <div>
            <h1>WORKOUT COMPLETED!!!</h1>
            <button onClick={clickFunc}></button>
        </div>
    )
}

export default WorkoutCompletedView;