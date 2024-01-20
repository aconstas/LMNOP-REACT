import styles from "./Timer.module.css";
import { useEffect } from "react";

export default function Timer({ gameStarted, time, setTime }) {

  useEffect(() => {
    let interval;

    if (gameStarted) {
        interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
    } 
    return () => clearInterval(interval);
  }, [gameStarted, time]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return <h5 id={styles.timer}>{formatTime(time)}</h5>;
}
