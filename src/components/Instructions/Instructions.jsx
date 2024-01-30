import styles from "../../shared/styles/modal.module.css";
import close from "../../assets/close.png";

export default function Instructions({
  showInstructions,
  setShowInstructions,
}) {
  const toggleInstructions = () => {
    console.log("clicked!");
    setShowInstructions(!showInstructions);
  };

  return (
    <>
      <div className={styles.modalBackground}></div>
      <div id={styles.instructionsContainer}>
        <img
          id={styles.closeIcon}
          src={close}
          onClick={toggleInstructions}
          alt="close button"
        />
        <h2 id={styles.instructionsTitle}>INSTRUCTIONS</h2>
        <p className={styles.instructionsText}>
          Guess 5 words using one hint and the first letter of the word in the
          shortest amount of time.
        </p>
        <ul id={styles.rulesContainer}>
          <li>Three guesses per word.</li>
          <li>The letter tile will shake for incorrect guesses.</li>
          <li>
            Letter tile will change color, depending on which guess is correct.
          </li>
          <li>The guesses must go in order of the alphabet.</li>
          <li>
            Correct answers will be revealed after the third incorrect guess.
          </li>
        </ul>
        <h5 className={styles.exampleHeading}>Examples</h5>
        <div id={styles.examplesContainer}>
          <div className={styles.exampleContainer}>
            <div className={`${styles.exampleLetterbox} ${styles.guess1}`}>A</div>
            <p className={styles.spaceFont}>First guess was correct.</p>
          </div>
          <div className={styles.exampleContainer}>
            <div className={`${styles.exampleLetterbox} ${styles.guess2}`}>A</div>
            <p className={styles.spaceFont}>Second guess was correct.</p>
          </div>
          <div className={styles.exampleContainer}>
            <div className={`${styles.exampleLetterbox} ${styles.guess3}`}>A</div>
            <p className={styles.spaceFont}>Third guess was correct.</p>
          </div>
          <div className={styles.exampleContainer}>
            <div className={`${styles.exampleLetterbox} ${styles.guessFAIL}`}>A</div>
            <p className={styles.spaceFont}>Incorrect after three guesses.</p>
          </div>
        </div>
        <p id={styles.bottomText}>A new puzzle is released daily at midnight.</p>
      </div>
    </>
  );
}
