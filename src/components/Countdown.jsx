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
        <div className="countdown-container" style={{background: "#fe7000", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h1 style={{fontSize: "5.2em"}}>{count}</h1>
        </div>
    )
};

export default Countdown;