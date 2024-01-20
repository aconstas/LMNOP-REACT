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
  wordSetIndex,
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

  const getGuessStyle = () => {
    const guessNumber = guessCount[wordSetIndex];
    switch(guessNumber) {
      case 0:
        return undefined;
      case 1:
        return styles.guess1;
      case 2:
        return styles.guess2;
      case 3:
        return styles.guess3;
      case 'FAIL':
        return styles.guessFAIL;
    }
  }

  return (
    <div className={styles.container}>
      <div
        id={isActive ? styles.active : undefined}
        className={`${styles.letterBox} ${getGuessStyle()} ${
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
