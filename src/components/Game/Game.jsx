import CurrentHint from "../CurrentHint/CurrentHint";
import GuessInput from "../GuessInput/GuessInput";
import Timer from "../Timer/Timer";
import styles from "./Game.module.css";

export default function Game({ isModalOpen }) {
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
      <Timer />
    </div>
  );
}
