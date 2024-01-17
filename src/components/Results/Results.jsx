import styles from "../../shared/styles/modal.module.css";

// should accept result object as props
export default function Results() {
  const sendResults = () => {
    const gameNumber = 1;
    const time = '1:25';
    const score = '🟥🟩🟨🟩🟧';
    window.location.href = `sms:&body=LMNOP #${gameNumber} ⏱️${time}%0A${score}%0A A   B   C   D   E`;
  }


  return (
    <>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>RESULTS</h2>
        <div>
          <h2 className={styles.modalHeading}>1:25</h2>
          <div className={styles.resultsBoard}></div>
          <div id={styles.stats}>
            <div>
              <h3 className={styles.modalHeading}>5</h3>
              <p className={styles.statsDescription}>played</p>
            </div>
            <div>
              <h3 className={styles.modalHeading}>87%</h3>
              <p className={styles.statsDescription}>accuracy</p>
            </div>
            <div>
              <h3 className={styles.modalHeading}>1</h3>
              <p className={styles.statsDescription}>streak</p>
            </div>
          </div>
        </div>
        <button className={styles.modalButton} onClick={sendResults}>SHARE</button>
      </div>
    </>
  );
}

// .modalText
