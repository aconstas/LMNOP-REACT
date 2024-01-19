import { useState } from "react";
import CurrentHint from "../CurrentHint/CurrentHint";
import GuessInput from "../GuessInput/GuessInput";
import Timer from "../Timer/Timer";
import styles from "./Game.module.css";

export default function Game({
  isModalOpen,
  gameStarted,
  userGuess,
  currentWordlist,
  activeInputIndex,
  checkGuess,
  hints,
}) {

  return (
    <div className={isModalOpen ? styles.blurred : ""}>
      <CurrentHint hints={hints} activeInputIndex={activeInputIndex}/>
      <div id={styles.guessInputContainer}>
        {currentWordlist.map((wordSet, index) => {
          return (
            <GuessInput
              key={wordSet.word}
              userGuess={userGuess[index]}
              correctWord={wordSet.word}
              isActive={index === activeInputIndex}
              checkGuess={checkGuess}
            />
          );
        })}
      </div>
      <Timer gameStarted={gameStarted} />
    </div>
  );
}

// i think i will need to utilize the data and map over the word list to render the guess inputs
// GuessInput will need to have correctWord state, and guessText
