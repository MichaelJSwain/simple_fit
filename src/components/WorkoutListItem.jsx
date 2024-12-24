import { Link } from "react-router-dom";

const WorkoutListItem = ({workout}) => {
    return (
        <Link to={`/workouts/${workout._id}`}>
        <div className="WorkoutListItem" style={{display: 'flex', border: '1px solid black', padding: '10px', margin: '10px 0'}}>
            <div className="img_container">
                <div style={{height: '50px', width: '50px', background: 'grey'}} className="placeholder_img">

                </div>
            </div>
            <div className="text_container" style={{marginLeft: '10px'}}>
                <div className="title_container" style={{marginBottom: '4px'}}>
                    <h2 className="title" style={{fontSize: '16px', textTransform: 'uppercase', margin: '0', lineHeight: '20px'}}>{workout.name}</h2>
                </div>
                <div className="info_container" style={{lineHeight: '14px'}}>
                    <span className="info" style={{fontSize: '12px'}} >{workout.difficulty}</span> - 
                    <span className="info" style={{fontSize: '12px'}}>{workout.duration}</span> - 
                    <span className="info" style={{fontSize: '12px'}}>{workout.equipment}</span> - 
                    <span className="info" style={{fontSize: '12px'}}>{workout.format}</span>
                </div>
            </div>
        </div>
        </Link>
    )
};

export default WorkoutListItem;