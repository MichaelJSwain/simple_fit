import axios from "axios";
import { useEffect, useState } from "react";
import LoadingView from "./LoadingView";
import WorkoutList from "./WorkoutList";
import WorkoutListFilters from "./WorkoutListFilters";

const WorkoutListView = () => {
    const [modalActive, setModalActive] = useState(false); 
    const [workoutList, setWorkoutList] = useState([]);
    const [filtersApplied, setFiltersApplied] = useState([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
    }, [filtersApplied]);

    const filterWorkouts = () => {
        console.log("filtering workouts");
        if (!filtersApplied.length) {
            setFilteredWorkouts(workoutList)
            return;
        }
        const filtersArray = [];
        const filteredWorkouts = filtersApplied.length ? [] : workoutList;

        filtersApplied.forEach(f => {
            console.log(f)
            const [category, value]  = f.split("_");
            const parsedValue = value.split("-").join(" ")
            filtersArray[category] = filtersArray[category] || [];
            filtersArray[category].push(parsedValue);
        })

        const filteredKeys = Object.keys(filtersArray);
        console.log(filteredKeys);
        console.log("filters arr = ", filtersArray);

        workoutList.forEach(workout => {
            let isMatch = [];
   
            filteredKeys.forEach(key => {
                if (workout[key]) {
                    if (filtersArray[key].some(f => `${workout[key]}`.toLowerCase().includes(f))) {
                        isMatch.push(true);
                    } else {
                        isMatch.push(false);
                    }
                }
            })

            if (!isMatch.includes(false)) {
                filteredWorkouts.push(workout);
            }
        })
        setFilteredWorkouts(filteredWorkouts);
    };

    const handleFilter = (filter) => {
        console.log(filter);
        const filterIndex = filtersApplied.indexOf(filter);
        let updatedFilters = [...filtersApplied];
        if (filterIndex > -1) {
            updatedFilters.splice(filterIndex, 1);
        } else {
            updatedFilters.push(filter);
        }
        setFiltersApplied(updatedFilters);
    }

    return (
        <div className="WorkoutListView">
            <div className="screen_content_container">
            <div className="PageTitle_container" style={{margin: '10px'}}>
                <h1 className="PageTitle" style={{margin: '0', fontSize: '32px'}}>Workouts</h1>
            </div>
            <button className="Button-Secondary" onClick={() => setModalActive(!modalActive)}>Filter</button>
            
            
            {isLoading && <LoadingView/>}
            {workoutList.length && <WorkoutList workoutList={filteredWorkouts} filters={filtersApplied}/>}
            </div>
            <div className={modalActive ? 'modalContainer active' : 'modalContainer'}>
          <button onClick={() => {setModalActive(!modalActive)}}>X</button>
          <WorkoutListFilters filterFunc={handleFilter}/>
          <button className='primaryCta' onClick={() => setModalActive(!modalActive)}>See {filteredWorkouts.length} results</button>
        </div>
        </div>
    )
};

export default WorkoutListView;