import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingView from "./LoadingView";
import WorkoutActiveView from "./WorkoutActiveView";
import { AuthContext } from "../AuthContextProvider";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutGoals from "./WorkoutGoals";
import ListItem from "./ListItem";

const WorkoutDetailView= () => {
    const [workout, setWorkout] = useState();
    const [isLoading, setIsLoading] = useState();
    const [workoutActive, setWorkoutActive] = useState(false);
    const [isFavourited, setIsFavourited] = useState();
    const authContext = useContext(AuthContext);
    const workoutDetailsRef = useRef();
    const navigate = useNavigate();

    const {id} = useParams();
    console.log("params = ", id);

    const fetchWorkout = () => {
        console.log("fetching workouts");
        axios.get(`http://localhost:8080/exerciseApp/api/workouts/${id}`)
        .then(res => {
            console.log(`workouts = `, res);
            const workout = res.data;
            if (authContext.user.favourites.some(f => f.toString() == workout._id)) {
                console.log("IS Favourited!");
                setIsFavourited(true);
            }
            setIsLoading(false);
            setWorkout(workout);

            workoutDetailsRef.current = [
                {value: workout.duration, label: "Duration"},
                {value: workout.difficulty, label: "Difficulty"},
                {value: workout.type, label: "Type"},
            ]
        })
        .catch(e => {
            console.log('error fetching workouts');
        })
    }
    useEffect(() => {
        fetchWorkout();
    }, []);

    const handleWorkoutBegin = () => {
        axios.post("http://localhost:8080/exerciseApp/api/workouts/current", {
            userId: authContext.user._id,
            workoutId: workout._id
        })
        .then(() => {
            console.log("successfully persisted in progress workout");
        })
        .catch(e => {
            console.log("error persisting in progress workout");
        })
        setWorkoutActive(true);
    }

    const handleFavourite = (workoutId) => {
        console.log("favouriting ", workoutId);
        axios.post("http://localhost:8080/exerciseApp/api/favourites", {
            userId: authContext.user._id,
            workoutId
        })
        .then(() => {
            console.log("favourited workout!");
            setIsFavourited(!isFavourited);
        })
        .catch(e => {
            console.log("error favouritng workout");
        })
    }

    const handleEndWorkout = () => {
        navigate("/")
    }

    return (
        <>
            
            {isLoading && <LoadingView />}
            {(workout && !workoutActive) && (
                <div className="MainLayout-component">
                    <Link to="/">Workouts</Link>
                <div style={{padding: "0 0 80px 0"}}>
                    <WorkoutDetails details={workoutDetailsRef.current} />

                    <hr style={{margin: "20px 0"}}></hr>

                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
                        <h2 style={{margin: "0"}}>{workout.name}</h2>
                        
                        <div onClick={() => handleFavourite(workout._id)} style={{background: "white", border: "1px solid black", borderRadius: "50%", height: "30px", width: "30px", justifyContent: "center", alignItems: "center", display: "flex"}}>
                            {!isFavourited ? <svg className="IconBadgeFilled Icon_Icon__qPZ8O Icon_regular__MbCqv" data-testid="icon-utility-wishlist-svg" width="1em" height="1em" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M7 3.63281L6.37109 3.00391L5.71484 2.34766C5.16797 1.80078 4.45703 1.5 3.69141 1.5C2.13281 1.5 0.875 2.78516 0.875 4.34375C0.875 5.10938 1.14844 5.82031 1.69531 6.36719L2.35156 7.02344L7 11.6445L11.6211 7.02344L12.2773 6.36719C12.8242 5.82031 13.125 5.10938 13.125 4.34375C13.125 2.78516 11.8398 1.5 10.2812 1.5C9.51562 1.5 8.80469 1.80078 8.25781 2.34766L7.60156 3.00391L7 3.63281ZM7.60156 12.2734L7 12.875L6.37109 12.2734L1.75 7.625L1.06641 6.96875C0.382812 6.28516 0 5.32812 0 4.34375C0 2.29297 1.64062 0.625 3.69141 0.625C4.67578 0.625 5.63281 1.03516 6.31641 1.71875L6.37109 1.77344L7 2.375L7.60156 1.77344L7.65625 1.71875C8.33984 1.03516 9.29688 0.625 10.2812 0.625C12.332 0.625 14 2.29297 14 4.34375C14 5.32812 13.5898 6.28516 12.9062 6.96875L12.25 7.625L7.60156 12.2734Z" fill="#1B1D1F"></path></svg> :
                            <svg className="IconBadgeFilled Icon_Icon__qPZ8O Icon_regular__MbCqv" data-testid="icon-utility-wishlist-filled-svg" width="1em" height="1em" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M1.06641 6.96875C0.382812 6.28516 0 5.32812 0 4.34375C0 2.29297 1.64062 0.625 3.69141 0.625C4.67578 0.625 5.63281 1.03516 6.31641 1.71875L7 2.375L7.65625 1.71875C8.33984 1.03516 9.29688 0.625 10.2812 0.625C12.332 0.625 14 2.29297 14 4.34375C14 5.32812 13.5898 6.28516 12.9062 6.96875L12.25 7.625L7 12.875L1.75 7.625L1.06641 6.96875Z" fill="#1B1D1F"></path></svg>}
                        </div>
                    </div>
                    
                    <p>{workout.description}</p>


                    {workout.goals && <WorkoutGoals goals={workout.goals} />}
                

                    {workout.trainingSet && (
                        <div style={{marginTop: "20px"}}>
                        <h4 style={{margin: "0"}}>Training set</h4>
                        {workout.trainingSet.map(set => {
                            return (
                                <ListItem key={set._id} isLinked={false} id={set._id} title={set.name} info={[`${set.timer} sec`]}/>
                            )
                        })}
                    </div>
                    )
                    }
 
                    
               
                </div>
                <div style={{position: "fixed"}} className="filters_button_container">
                        <button style={{width: "100%", maxWidth: "unset"}} className='primaryCta' onClick={handleWorkoutBegin}>Begin training</button>
                    </div>
                </div>
            )}
            {(workout && workoutActive) && (
                <WorkoutActiveView workout={workout} handleWorkoutCancel={() => setWorkoutActive(false)} handleEndWorkout={handleEndWorkout} />
            )}
        </>
    )
}
export default WorkoutDetailView;