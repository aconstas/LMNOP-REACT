import CurrentHint from "../CurrentHint/CurrentHint";
import GuessInput from "../GuessInput/GuessInput";
import Timer from "../Timer/Timer";
import styles from "./Game.module.css";
// import { useState } from "react";

export default function Game({
  isModalOpen,
  gameStarted,
  userGuess,
  currentWordlist,
  activeInputIndex,
  checkGuess,
  hints,
  shakeIncorrect,
  setShakeIncorrect,
  guessCount,
  time,
  setTime
}) {

  // const [time, setTime] = useState(0);

  return (
    <div className={isModalOpen ? styles.blurred : ""}>
      <CurrentHint hints={hints} activeInputIndex={activeInputIndex}/>
      <div id={styles.guessInputContainer}>
        {currentWordlist.map((wordSet, index) => {
          return (
            <GuessInput
              key={wordSet.word}
              userGuess={userGuess[index]}
              correctWord={wordSet.word.toUpperCase()}
              isActive={index === activeInputIndex}
              checkGuess={checkGuess}
              shakeIncorrect={shakeIncorrect}
              setShakeIncorrect={setShakeIncorrect}
              guessCount={guessCount}
              activeInputIndex={activeInputIndex}
              wordSetIndex={index}
            />
          );
        })}
      </div>
      <Timer gameStarted={gameStarted} time={time} setTime={setTime} />
    </div>
  );
}