import styles from "./Timer.module.css";
import { useStopwatch } from "../../contexts/stopwatchContext";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Timer({gameStarted, lastPlayed, currentDate}) {
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

  if (lastPlayed === currentDate) {
    const [lastTime] = useLocalStorage('lastGameTime')
    return <h5 id={styles.timer}>{formatTime(lastTime)}</h5>;
  }

  return <h5 id={styles.timer}>{formatTime(time)}</h5>;
}
