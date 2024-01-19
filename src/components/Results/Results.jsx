import styles from "../../shared/styles/modal.module.css";

// should accept result object as props
export default function Results({ guessCount, currentWordList }) {
  const convertGuessCountToEmoji = (guessCount) => {
    const colorMap = {
      'fail': "🟥",
      1: "🟩",
      2: "🟨",
      3: "🟧",
    };
    const emojiString = guessCount.map(value => colorMap[value] || '?').join('');
    console.log(emojiString, currentWordList);
    return emojiString;
  }
  
  const scoreEmojiString = convertGuessCountToEmoji(guessCount);
  const lettersString = currentWordList.map(set => set.word[0]).join('   ');

  const sendResults = () => {
    const gameNumber = 1;
    const time = "1:25";
    window.location.href = `sms:&body=LMNOP #${gameNumber} ⏱️${time}%0A${scoreEmojiString}%0A ${lettersString}`;
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>RESULTS</h2>
        <div>
          <h2 className={styles.modalHeading}>1:25</h2>
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

// .modalText
