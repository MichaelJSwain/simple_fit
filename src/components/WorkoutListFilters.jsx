import { useState } from "react";

const WorkoutListFilters = ({filterFunc, filtersApplied}) => {
    const [checked, setChecked] = useState(false);
    const filters = [ 
            {
            category: "Difficulty",
            filters: [
                {
                    label: "Beginner",
                    id: "difficulty_beginner",
                    name: "Beginner"
                },
                {
                    label: "Intermediate",
                    id: "difficulty_intermediate",
                    name: "Intermediate"
                },
                {
                    label: "Advanced",
                    id: "difficulty_advanced",
                    name: "Advanced"
                }     
            ]
        },
        {
            category: "Equipment",
            filters: [
                {
                    label: "No equipment",
                    id: "equipment_no-equipment",
                    name: "No equipment"
                },
                {
                    label: "Club apparatus",
                    id: "equipment_club-apparatus",
                    name: "Club apparatus"
                } 
            ]
        },
        {
            category: "Goal",
            filters: [
                {
                    label: "Shape & tone",
                    id: "goals_shape-&-tone",
                    name: "Shape & tone"
                },
                {
                    label: "Weight loss",
                    id: "goals_weight-loss",
                    name: "Weight loss"
                },
                {
                    label: "Muscle building",
                    id: "goals_muscle-building",
                    name: "Muscle building"
                },
                {
                    label: "Get fitter",
                    id: "goals_get-fitter",
                    name: "Get fitter"
                },
                {
                    label: "Improve performance",
                    id: "goals_improve-performance",
                    name: "Improve performance"
                }
            ]
        },
        {
            category: "Format",
            filters: [
                {
                    label: "Individual workout",
                    id: "format_individual-workout",
                    name: "Individual workout"
                },
                {
                    label: "Video-workout",
                    id: "format_video-workout",
                    name: "Video-workout"
                },
                {
                    label: "Audio-workout",
                    id: "format_audio-workout",
                    name: "Audio-workout"
                } 
            ]
        }
    ];
    
    console.log("filters passed to WorkouteLister => ", filtersApplied);

    const handleChange = (e) => {
        console.log(e.target.id)
        setChecked(!checked)
        filterFunc(e.target.id);
    }

    return (
        <>
        {filters.map(f => {
            return (
                <div key={f.category} style={{margin: "15px 0"}}>
                    <h4 style={{margin: "0 0 5px 0"}}>{f.category}</h4>
                    <ul style={{display: "flex", flexWrap: "wrap", padding: "0", margin: "0"}}>
                        {f.filters.map(filter => {
                            return <li style={{listStyle: "none", padding: "10px", margin: "0 5px 5px 0", fontSize: "12px"}} className={filtersApplied.includes(filter.id) ? "filter_item filter_active" : "filter_item"} key={filter.id} onClick={handleChange} id={filter.id} name={filter.name}>
                                    {filter.label}
                                </li>
                        })}
                    </ul>
                </div>
            )
        })}
        </>
    )
};

export default WorkoutListFilters;