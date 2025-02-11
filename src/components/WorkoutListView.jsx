import axios from "axios";
import { useEffect, useState } from "react";
import LoadingView from "./LoadingView";
import WorkoutList from "./WorkoutList";
import NoResults from "./NoResults";
import ActiveFilters from "./ActiveFilters";
import FixedButton from "./FixedButton";
import Modal from "./Modal";
import WorkoutFiltersDrawer from "./WorkoutFiltersDrawer";
import { WorkoutBuilderView } from "./WorkoutBuilderView";

const WorkoutListView = () => {
    const [filterModalActive, setfilterModalActive] = useState(false); 
    const [workoutBuilderModalActive, setWorkoutBuilderModalActive] = useState(false);
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
        <div className="WorkoutListView MainLayout-component">
            <div className="screen_content_container">
            <div className="PageTitle_container" style={{margin: '10px'}}>
                <h1 className="PageTitle" style={{margin: '0', fontSize: '32px'}}>Workouts</h1>
            </div>

            {!!filtersApplied && <ActiveFilters filters={filtersApplied} handleFilter={handleFilter} />}

            <button className="Button-Secondary" onClick={() => setfilterModalActive(!filterModalActive)}>Filter</button>
            <button className="Button-Secondary" onClick={() => setWorkoutBuilderModalActive(!workoutBuilderModalActive)}>Create Workout</button>

            {isLoading && <LoadingView/>}
            {filteredWorkouts.length ? 
                <WorkoutList workoutList={filteredWorkouts} filters={filtersApplied}/> : 
                <NoResults />
            }
            </div>
            <Modal modalActive={filterModalActive}>
                <WorkoutFiltersDrawer 
                    filtersApplied={filtersApplied} 
                    handleResetFilters={() => setFiltersApplied([])} 
                    filterFunc={handleFilter}
                />
                <FixedButton 
                    clickFunc={() => setfilterModalActive(!filterModalActive)} 
                    text={`See ${filteredWorkouts.length} results`}
                />
            </Modal>
            <Modal modalActive={workoutBuilderModalActive}>
                <WorkoutBuilderView toggleModal={() => setWorkoutBuilderModalActive(!workoutBuilderModalActive)} />
            </Modal>
        </div>
    )
};

export default WorkoutListView;