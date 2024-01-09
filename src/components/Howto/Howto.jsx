import { useState } from "react";
import styles from "./Howto.module.css";

export default function Howto() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(false);
  }

  if (!isModalOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.backgroundBlur}></div>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>HOW-TO:</h2>
        <p className={styles.modalText}>
          Using 1-word clues, guess 5 words that start with each of the given
          alphabetical letters. You have 3 chances for each letter. The clues
          can be synonyms, antonyms, etc.
        </p>
        <button className={styles.modalButton} onClick={toggleModal}>LET'S PLAY!</button>
      </div>
    </>
  );
}
