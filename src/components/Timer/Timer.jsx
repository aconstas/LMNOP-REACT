import styles from "./Timer.module.css";
import { useStopwatch } from "../../contexts/stopwatchContext";
import { useEffect } from "react";

export default function Timer({gameStarted}) {
  const {time, isRunning, setIsRunning} = useStopwatch();

  useEffect(() => {
    if (!gameStarted) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  }, [gameStarted, setIsRunning]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return <h5 id={styles.timer}>{formatTime(time)}</h5>;
}
