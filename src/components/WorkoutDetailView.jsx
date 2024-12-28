import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingView from "./LoadingView";
import WorkoutActiveView from "./WorkoutActiveView";
import { AuthContext } from "../AuthContextProvider";

const WorkoutDetailView= () => {
    const [workout, setWorkout] = useState();
    const [isLoading, setIsLoading] = useState();
    const [workoutActive, setWorkoutActive] = useState(false);
    const authContext = useContext(AuthContext);

    const {id} = useParams();
    console.log("params = ", id);

    const fetchWorkout = () => {
        console.log("fetching workouts");
        axios.get(`http://localhost:8080/exerciseApp/api/workouts/${id}`)
        .then(res => {
            console.log(`workouts = `, res);
            const workout = res.data;
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
                        <div onClick={() => handleFavourite(workout._id)} style={{background: "black", borderRadius: "50%", height: "30px", width: "30px"}}></div>
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