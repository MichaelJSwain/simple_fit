import axios from "axios";
import { useEffect, useState } from "react";
import LoadingView from "./LoadingView";
import WorkoutListItem from "./WorkoutListItem";

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
        <>
        <h1>Workout list view</h1>
        {isLoading && <LoadingView/>}
        {workoutList.length &&
            workoutList.map(workout => {
                return <WorkoutListItem key={workout._id} workout={workout}/>
            })
        }
        </>
    )
};

export default WorkoutListView;