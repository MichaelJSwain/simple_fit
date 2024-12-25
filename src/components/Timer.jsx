import { useEffect, useRef, useState } from "react";
// import Button from "./Buttons/PrimaryButton/Button";

let timerId = null;

const Timer = ({duration, handleTimerComplete}) => {
    console.log("new timer")
    const [timerCount, setTimerCount] = useState(duration.timer);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const timerId = useRef();

    useEffect(() => {
        console.log("use effect running")
    }, []);

    const timer = {
        start: function() {
            timerId.current = setInterval(function() {
                setTimerCount(currVal => currVal - 1);
            }, 1000);
            console.log(timerId);
        },
        pause: () => {
            clearInterval(timerId.current);
        }
    }

    useEffect(function() {
        if (isTimerStarted) {
            timer.start();
        } else {
            timer.pause();
        }

        return function() {
            timer.pause();
        }
    }, [isTimerStarted]);

    useEffect(() => {
        if (timerCount < 1) {
            timer.pause();
            handleTimerComplete();
        }
    }, [timerCount]);

    return (
        <div style={{display: "flex", justifyContent: "end", width: "100%", alignItems: "center"}}>
            <div style={{width: "100%"}}>
                <h1>{timerCount}</h1>
            </div>
            <div style={{position: "absolute"}}>
                <button text={isTimerStarted ? "Pause" : "Start"} onClick={() => setIsTimerStarted(!isTimerStarted)} variant="primary"/>
                
            </div>
        </div>
    )
};

export default Timer;