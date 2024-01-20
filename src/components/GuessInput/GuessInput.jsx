import { useRef, useEffect } from "react";
import styles from "./GuessInput.module.css";

export default function GuessInput({
  userGuess,
  correctWord,
  isActive,
  checkGuess,
  shakeIncorrect,
  setShakeIncorrect,
  guessCount,
  activeInputIndex,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }
  }, [isActive]);

  const onAnimationEnd = () => {
    setShakeIncorrect(false);
  };

  return (
    <div className={styles.container}>
      <div
        id={isActive ? styles.active : undefined}
        className={`${styles.letterBox}  ${
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
        id={isActive ? styles.active : undefined}
      ></input>
    </div>
  );
}
