import { useRef, useEffect } from "react";
import styles from "./GuessInput.module.css";

export default function GuessInput({
  userGuess,
  correctWord,
  isActive,
  checkGuess,
  shakeIncorrect,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }
  }, [isActive]);

  const onAnimationEnd = () => {
    setIsCorrect(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.letterBox} ${isActive ? styles.active : undefined} ${
          shakeIncorrect ? styles.shaking : undefined
        }`}
        onAnimationEnd={onAnimationEnd}
      >
        {correctWord[0].toUpperCase()}
      </div>
      <input
        ref={inputRef}
        type="text"
        enterKeyHint="go"
        autoComplete="off"
        readOnly
        value={isActive ? userGuess : ""}
        className={isActive ? styles.active : undefined}
      ></input>
    </div>
  );
}
