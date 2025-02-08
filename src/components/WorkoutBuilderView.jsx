import axios from "axios";
import { useEffect, useRef, useState } from "react"
import LoadingView from "./LoadingView";
import FixedButton from "./FixedButton";
import { ExerciseListView } from "./ExerciseListView";


export const WorkoutBuilderView = () => {




    return (
        <div>
            <ExerciseListView></ExerciseListView>
        </div>
    )   
}