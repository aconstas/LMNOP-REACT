import styles from "./GuessInput.module.css";

export default function GuessInput() {
  return (
    <div className={styles.container}>
      <div className={styles.letterBox}></div>
      <div>
        <input type="text" enterKeyHint="go" autoComplete="off" readOnly></input>
      </div>
    </div>
  );
}

// how to handle autofocus for the first input box?