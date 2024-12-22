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
        <div>
            <h3>Goal</h3>
            <ul>
                <li>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="goals_shape-&-tone" name="shape-&-tone" />
                        <span>Shape & tone</span>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="goals_weight-loss" name="weight-loss" />
                        <span>Weight loss</span>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="goals_muscle-building" name="muscle-building" />
                        <span>Muscle building</span>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="goals_get-fitter" name="get-fitter" />
                        <span>Get fitter</span>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="goals_improve-performance" name="improve-performance" />
                        <span>Improve performance</span>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <h3>Format</h3>
            <ul>
                <li>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="format_individual-workout" name="individual-workout" />
                        <span>Individual workout</span>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="format_video-workout" name="video-workout" />
                        <span>Video-workout</span>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={checked} onChange={handleChange} id="format_audio-workout" name="audio-workout" />
                        <span>Audio-workout</span>
                    </div>
                </li>
            </ul>
        </div>
        </>
    )
};

export default WorkoutListFilters;