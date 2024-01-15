import { useState } from "react";
import CurrentHint from "../CurrentHint/CurrentHint";
import GuessInput from "../GuessInput/GuessInput";
import Timer from "../Timer/Timer";
import styles from "./Game.module.css";

export default function Game({ isModalOpen, gameStarted }) {

  return (
    <div className={isModalOpen ? styles.blurred : ""}>
      <CurrentHint />
      <div id={styles.guessInputContainer}>
        <GuessInput />
        <GuessInput />
        <GuessInput />
        <GuessInput />
        <GuessInput />
      </div>
      <Timer gameStarted={gameStarted}/>
    </div>
  );
}

// i think i will need to utilize the data and map over the word list to render the guess inputs
// GuessInput will need to have correctWord state, and guessText