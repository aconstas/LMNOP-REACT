import styles from "./GuessInput.module.css";

export default function GuessInput({ userGuess, correctWord }) {
  return (
    <div className={styles.container}>
      <div className={styles.letterBox}>{correctWord[0].toUpperCase()}</div>
      <input type="text" enterKeyHint="go" autoComplete="off" readOnly value={userGuess}></input>
    </div>
  );
}

// how to handle autofocus for the first input box?
