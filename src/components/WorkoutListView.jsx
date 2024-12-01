import axios from "axios";
import { useEffect, useState } from "react";
import LoadingView from "./LoadingView";
import WorkoutList from "./WorkoutList";

const WorkoutListView = () => {
    const [workoutList, setWorkoutList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWorkouts = () => {
        axios.get("http://localhost:8080/exerciseApp/api/workouts")
        .then(res => {
            console.log(`workouts = `, res);
            const workouts = res.data;
            setIsLoading(false);
            setWorkoutList(workouts);
        })
        .catch(e => {
            console.log('error fetching workouts');
        })
    }

    useEffect(() => {
        console.log("executing use effect")
        fetchWorkouts();
    }, []);

    return (
        <div className="WorkoutListView">
            <h1 className="PageTitle">Workouts</h1>
            <button className="Button-Secondary">Filter</button>
            {isLoading && <LoadingView/>}
            {workoutList.length && <WorkoutList workoutList={workoutList}/>}
        </div>
    )
};

export default WorkoutListView;