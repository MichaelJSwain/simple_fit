import { useState } from "react";

const WorkoutListFilters = ({filterFunc}) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.id)
        setChecked(!checked)
        filterFunc(e.target.id);
    }

    return (
        <>
        <div>
            <h3>Level</h3>
            <ul>
                <li>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="difficulty_beginner" name="beginner" />
                        <span>Beginner</span>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="difficulty_intermediate" name="intermediate" />
                        <span>Intermediate</span>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="difficulty_advanced" name="intermediate" />
                        <span>Advanced</span>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <h3>Equipment</h3>
            <ul>
                <li>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="equipment_no-equipment" name="beginner" />
                        <span>No equipment</span>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="equipment_club-apparatus" name="intermediate" />
                        <span>Club apparatus</span>
                    </div>
                </li>
            </ul>
        </div>
        </>
    )
};

export default WorkoutListFilters;