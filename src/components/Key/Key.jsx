import { useCallback } from "react";
import styles from "./Key.module.css";
import React from "react";

const Key = ({ keyVal, addUserText }) => {

  const handleKeyClick = useCallback((keyVal) => {
    addUserText(keyVal)
  }, [addUserText]);

  return (
    <div
      className={styles.key}
      onClick={handleKeyClick}
    >
      {keyVal}
    </div>
  );
}

export default React.memo(Key);