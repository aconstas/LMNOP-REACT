import { useRef, useEffect } from "react";
import styles from "./GuessInput.module.css";

export default function GuessInput({
  userGuess,
  correctWord,
  isActive,
  checkGuess,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }
  }, [isActive]);

  return (
    <div className={styles.container}>
      <div className={`${styles.letterBox} ${isActive ? styles.active : ""}`}>
        {correctWord[0].toUpperCase()}
      </div>
      <input
        ref={inputRef}
        type="text"
        enterKeyHint="go"
        autoComplete="off"
        readOnly
        value={isActive ? userGuess : ""}
        className={isActive && styles.active}
      ></input>
    </div>
  );
}

// how to handle autofocus for the first input box?
