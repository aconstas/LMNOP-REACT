import { useCallback } from "react";
import styles from "./Key.module.css";

export default function Key({ keyVal, addUserText }) {

  const handleKeyClick = useCallback((key) => {
    addUserText(key)
  }, [addUserText]);

  return (
    <div
      className={styles.key}
      onClick={() => handleKeyClick()}
    >
      {keyVal}
    </div>
  );
}
