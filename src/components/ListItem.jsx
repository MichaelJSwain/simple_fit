import { Link } from "react-router-dom";

const ListItem = ({isLinked, id, title, info}) => {

    return isLinked ? (
        <Link to={`/workouts/${id}`}>
        <div className="WorkoutListItem" style={{display: 'flex', border: '1px solid black', padding: '10px', margin: '10px 0'}}>
            <div className="img_container">
                <div style={{height: '50px', width: '50px', background: 'grey'}} className="placeholder_img">

                </div>
            </div>
            <div className="text_container" style={{marginLeft: '10px'}}>
                <div className="title_container" style={{marginBottom: '4px'}}>
                    <h2 className="title" style={{fontSize: '16px', textTransform: 'uppercase', margin: '0', lineHeight: '20px'}}>{title}</h2>
                </div>
                <div className="info_container" style={{lineHeight: '14px'}}>
                    {info.map((i, idx) => {
                        return <span key={idx} className="infos" style={{fontSize: '12px'}} >{idx == 0 ? i : `- ${i}`} </span>
                    })}
                </div>
            </div>
        </div>
        </Link>
    ) :
    (   
        <div className="WorkoutListItem" style={{display: 'flex', border: '1px solid black', padding: '10px', margin: '10px 0'}}>
            <div className="img_container">
                <div style={{height: '50px', width: '50px', background: 'grey'}} className="placeholder_img">

                </div>
            </div>
            <div className="text_container" style={{marginLeft: '10px'}}>
                <div className="title_container" style={{marginBottom: '4px'}}>
                    <h2 className="title" style={{fontSize: '16px', textTransform: 'uppercase', margin: '0', lineHeight: '20px'}}>{title}</h2>
                </div>
                <div className="info_container" style={{lineHeight: '14px'}}>
                    {info.map((i, idx) => {
                        return <span key={idx} className="infos" style={{fontSize: '12px'}} >{idx == 0 ? i : `- ${i}`}</span>
                    })}
                </div>
            </div>
        </div>
    )
};

export default ListItem;