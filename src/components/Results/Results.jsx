import styles from "../../shared/styles/modal.module.css";
import close from "../../assets/close.png";

export default function Results({ guessCount, currentWordList, gameNumber, time, setShowResults, setIsModalOpen }) {
  const convertGuessCountToEmoji = (guessCount) => {
    const colorMap = {
      'FAIL': "🟥",
      1: "🟩",
      2: "🟨",
      3: "🟧",
    };
    const emojiString = guessCount.map(value => colorMap[value] || '?').join('');
    return emojiString;
  }

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  
  const scoreEmojiString = convertGuessCountToEmoji(guessCount);
  const lettersString = currentWordList.map(set => set.word[0].toUpperCase()).join('   ');
  const formattedTime = formatTime(time);

  const sendResults = () => {
    window.location.href = `sms:&body=LMNOP #${gameNumber} ⏱️${formattedTime}%0A${scoreEmojiString}%0A ${lettersString}`;
  };

  const closeResults = () => {
    setShowResults(false);
    setIsModalOpen(false);
  }

  return (
    <>
      <div className={styles.modalContainer}>
        <img id={styles.closeIcon} src={close} onClick={closeResults}/>
        <h2 className={styles.modalTitle}>RESULTS</h2>
        <div>
          <h2 className={styles.modalHeading}>{formattedTime}</h2>
          <div className={styles.resultsBoard}>
            {currentWordList.map((set, index) => {
              return (
                <div
                  key={set.word}
                  className={styles[`guess${guessCount[index]}`]}
                >
                  {set.word[0].toUpperCase()}
                </div>
              );
            })}
          </div>
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
        <button className={styles.modalButton} onClick={sendResults}>
          SHARE
        </button>
      </div>
    </>
  );
}