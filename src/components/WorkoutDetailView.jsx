import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingView from "./LoadingView";
import WorkoutActiveView from "./WorkoutActiveView";
import { AuthContext } from "../AuthContextProvider";

const WorkoutDetailView= () => {
    const [workout, setWorkout] = useState();
    const [isLoading, setIsLoading] = useState();
    const [workoutActive, setWorkoutActive] = useState(false);
    const [isFavourited, setIsFavourited] = useState();
    const authContext = useContext(AuthContext);

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

    return (
        <>
            
            {isLoading && <LoadingView />}
            {(workout && !workoutActive) && (
                <div>
                    <Link to="/">Workouts</Link>
                <div style={{padding: "20px 20px 80px 20px"}}>
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

                    <hr style={{margin: "20px 0"}}></hr>

                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
                        <h2 style={{margin: "0"}}>{workout.name}</h2>
                        
                        <div onClick={() => handleFavourite(workout._id)} style={{background: "white", border: "1px solid black", borderRadius: "50%", height: "30px", width: "30px", justifyContent: "center", alignItems: "center", display: "flex"}}>
                            {!isFavourited ? <svg className="IconBadgeFilled Icon_Icon__qPZ8O Icon_regular__MbCqv" data-testid="icon-utility-wishlist-svg" width="1em" height="1em" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M7 3.63281L6.37109 3.00391L5.71484 2.34766C5.16797 1.80078 4.45703 1.5 3.69141 1.5C2.13281 1.5 0.875 2.78516 0.875 4.34375C0.875 5.10938 1.14844 5.82031 1.69531 6.36719L2.35156 7.02344L7 11.6445L11.6211 7.02344L12.2773 6.36719C12.8242 5.82031 13.125 5.10938 13.125 4.34375C13.125 2.78516 11.8398 1.5 10.2812 1.5C9.51562 1.5 8.80469 1.80078 8.25781 2.34766L7.60156 3.00391L7 3.63281ZM7.60156 12.2734L7 12.875L6.37109 12.2734L1.75 7.625L1.06641 6.96875C0.382812 6.28516 0 5.32812 0 4.34375C0 2.29297 1.64062 0.625 3.69141 0.625C4.67578 0.625 5.63281 1.03516 6.31641 1.71875L6.37109 1.77344L7 2.375L7.60156 1.77344L7.65625 1.71875C8.33984 1.03516 9.29688 0.625 10.2812 0.625C12.332 0.625 14 2.29297 14 4.34375C14 5.32812 13.5898 6.28516 12.9062 6.96875L12.25 7.625L7.60156 12.2734Z" fill="#1B1D1F"></path></svg> :
                            <svg className="IconBadgeFilled Icon_Icon__qPZ8O Icon_regular__MbCqv" data-testid="icon-utility-wishlist-filled-svg" width="1em" height="1em" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M1.06641 6.96875C0.382812 6.28516 0 5.32812 0 4.34375C0 2.29297 1.64062 0.625 3.69141 0.625C4.67578 0.625 5.63281 1.03516 6.31641 1.71875L7 2.375L7.65625 1.71875C8.33984 1.03516 9.29688 0.625 10.2812 0.625C12.332 0.625 14 2.29297 14 4.34375C14 5.32812 13.5898 6.28516 12.9062 6.96875L12.25 7.625L7 12.875L1.75 7.625L1.06641 6.96875Z" fill="#1B1D1F"></path></svg>}
                        </div>
                    </div>
                    
                    <p>{workout.description}</p>

                    {workout.goals && (
                        <div style={{display: "flex"}}>
                            {workout.goals.map(goal => {
                                return <div key={goal} style={{marginRight: "5px", background: "grey", padding: "5px", fontSize: "12px", color: "black"}}>{goal}</div>
                            })}
                        </div>
                        )
                    }
                

                    {workout.trainingSet && (
                        <div style={{marginTop: "20px"}}>
                        <h4 style={{margin: "0"}}>Training set</h4>
                        {workout.trainingSet.map(set => {
                            return (
                                <div key={set.name}>
                                <div className="WorkoutListItem" style={{display: 'flex', border: '1px solid black', padding: '10px', margin: '10px 0'}}>
                                <div className="img_container">
                                    <div style={{height: '50px', width: '50px', background: 'grey'}} className="placeholder_img">
                    
                                    </div>
                                </div>
                                <div className="text_container" style={{marginLeft: '10px'}}>
                                    <div className="title_container" style={{marginBottom: '4px'}}>
                                        <h2 className="title" style={{fontSize: '16px', textTransform: 'uppercase', margin: '0', lineHeight: '20px'}}>{set.name}</h2>
                                    </div>
                                    <div className="info_container" style={{lineHeight: '14px'}}>
                                        {set.timer} sec
                                    </div>
                                </div>
                            </div>
                            </div>
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
                <WorkoutActiveView workout={workout} handleWorkoutCancel={() => setWorkoutActive(false)} />
            )}
        </>
    )
}
export default WorkoutDetailView;