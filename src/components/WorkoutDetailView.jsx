import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingView from "./LoadingView";


const WorkoutDetailView= () => {
    const [workout, setWorkout] = useState();
    const [isLoading, setIsLoading] = useState();

    const {id} = useParams();
    console.log("params = ", id);

    const fetchWorkout = () => {
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

    return (
        <>
            {isLoading && <LoadingView />}
            {workout && (
                <div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <div style={{height: "50px", width: "50px", borderRadius: "50%", border: "1px solid black"}}></div>
                            <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                                <span>{workout.duration}</span>
                                <span>duration</span>
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <div style={{height: "50px", width: "50px", borderRadius: "50%", border: "1px solid black"}}></div>
                            <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                                <span>{workout.difficulty}</span>
                                <span>Difficulty</span>
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <div style={{height: "50px", width: "50px", borderRadius: "50%", border: "1px solid black"}}></div>
                            <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                                <span>{workout.type}</span>
                                <span>type</span>
                            </div>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>
                        <h2>{workout.name}</h2>
                        <div style={{background: "black", borderRadius: "50%", height: "40px", width: "40px"}}></div>
                    </div>
                    
                    <p>{workout.description}</p>

                    <div>
                        {workout.trainingSet.map(set => {
                            return (
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
                            )
                        })}
                    </div>
                    
                    <div style={{position: "fixed"}} className="filters_button_container">
                        <button className='primaryCta'>Begin</button>
                    </div>
                </div>
            )}
        </>
    )
}
export default WorkoutDetailView;