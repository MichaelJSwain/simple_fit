import { useEffect, useRef, useState } from "react"
// import "./Countdown.css";

const Countdown = ({num, handleCountdownFinish}) => {
    const [count, setCount] = useState(num);
    const countdownInterval = useRef();

    console.log("countdown ref = ",countdownInterval)

    const handleCountdown = () => {
        
    }

    useEffect(() => {
        // handleCountdown();

        const id = setInterval(() => {
            console.log("counting down ", count);
            setCount(currVal => {return currVal - 1});
        }, 1000);

        console.log("timer ID = ", id);
        countdownInterval.current = id;

        return () => {
            clearInterval(countdownInterval.current);
        }
    }, []);

    useEffect(() => {
        if (count === 0) {
            console.log("end of countdown ", countdownInterval)
            clearInterval(countdownInterval.current);
            handleCountdownFinish();
        }
    }, [count]);

    return (
        <div className="countdown-container">
            <h1>{count}</h1>
        </div>
    )
};

export default Countdown;