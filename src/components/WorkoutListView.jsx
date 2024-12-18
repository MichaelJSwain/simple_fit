import axios from "axios";
import { useEffect, useState } from "react";
import LoadingView from "./LoadingView";
import WorkoutList from "./WorkoutList";
import WorkoutListFilters from "./WorkoutListFilters";

const WorkoutListView = () => {
    const [workoutList, setWorkoutList] = useState([]);
    const [filters, setFilters] = useState([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log("filters = ", filters);

    const fetchWorkouts = () => {
        axios.get("http://localhost:8080/exerciseApp/api/workouts")
        .then(res => {
            console.log(`workouts = `, res);
            const workouts = res.data;
            setIsLoading(false);
            setWorkoutList(workouts);
            setFilteredWorkouts(workouts)
        })
        .catch(e => {
            console.log('error fetching workouts');
        })
    }

    useEffect(() => {
        fetchWorkouts();
    }, []);

    useEffect(() => {
        filterWorkouts();
    }, [filters]);

    const filterWorkouts = () => {
        console.log("filtering workouts");

        const filtered = filters.length ? [] : workoutList;
        const filteredWorkouts = filters.length ? [] : workoutList;;

        filters.forEach(f => {
            console.log(f)
            const [category, value]  = f.split("_");
            const parsedValue = value.split("-").join(" ")
            filtered[category] = filtered[category] || [];
            filtered[category].push(parsedValue);
        })

        const filteredKeys = Object.keys(filtered);
        console.log("FILTERED KEYS = ", filteredKeys);

        workoutList.forEach(workout => {
            let isMatch = [];

            filteredKeys.forEach(key => {
                if (filtered[key].includes(workout[key].toLowerCase())) {
                    isMatch.push(true);
                } else {
                    isMatch.push(false);
                }
            })

            if (!isMatch.includes(false)) {
                filteredWorkouts.push(workout);
            }
        })
        console.log("filtered worouts = ", filteredWorkouts);
        setFilteredWorkouts(filteredWorkouts)
    };

    const handleFilter = (filter) => {
        const filterIndex = filters.indexOf(filter);
        let updatedFilters = [...filters];
        if (filterIndex > -1) {
            updatedFilters.splice(filterIndex, 1);
        } else {
            updatedFilters.push(filter);
        }
        setFilters(updatedFilters);
    }

    return (
        <div className="WorkoutListView">
            <div className="PageTitle_container" style={{margin: '10px'}}>
                <h1 className="PageTitle" style={{margin: '0', fontSize: '32px'}}>Workouts</h1>
            </div>
            <button className="Button-Secondary">Filter</button>
            <WorkoutListFilters filterFunc={handleFilter}/>
            {isLoading && <LoadingView/>}
            {workoutList.length && <WorkoutList workoutList={filteredWorkouts} filters={filters}/>}
        </div>
    )
};

export default WorkoutListView;