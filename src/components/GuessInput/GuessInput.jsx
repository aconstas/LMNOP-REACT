import styles from "./GuessInput.module.css";

export default function GuessInput() {
  return (
    <div className={styles.container}>
      <div className={styles.letterBox}></div>
      <div>
        <input type="text" required enterKeyHint="go" autoComplete="off"></input>
      </div>
    </div>
  );
}

// how to handle autofocus for the first input box?