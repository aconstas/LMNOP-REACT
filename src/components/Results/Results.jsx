import styles from "../../shared/styles/modal.module.css";

// should accept result object as props
export default function Results() {
  const sendResults = () => {
    window.location.href = `sms:%body=hello + this + is + the + message`;
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
