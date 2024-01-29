import styles from '../../shared/styles/modal.module.css';
import { useStopwatch } from '../../contexts/stopwatchContext';

export default function Howto({ closeModal, isModalOpen }) {
  console.log('how-to rendered')
  const {isRunning, setIsRunning} = useStopwatch();
  if (!isModalOpen) {
    return null;
  }

  const start = () => {
    setIsRunning(true);
    closeModal();
  }

  return (
    <>
      <div className={styles.modalBackground}></div>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>HOW-TO:</h2>
        <p className={styles.modalText}>
          Using 1-word clues, guess 5 words that start with each of the given
          alphabetical letters. You have 3 chances for each letter. The clues
          can be synonyms, antonyms, part to whole, or any other word relationship.
        </p>
        <button className={styles.modalButton} onClick={start}>
          LET'S PLAY!
        </button>
      </div>
    </>
  );
}
