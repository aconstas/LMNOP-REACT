import styles from "../../shared/styles/modal.module.css";
import close from "../../assets/close.png";
import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function PastResults({
  lastPlayed,
  lastGameState,
  currentWordList,
  lastGameAccuracy,
  gamesPlayed,
  lettersString,
  gameNumber,
  showResults
}) {
  const [closePastResults, setClosePastResults] = useState(false);
  const [lastTime] = useLocalStorage("lastGameTime");
  const togglePastResults = () => {
    setClosePastResults(!closePastResults);
  };

  const formatLastGameTime = (lastTime) => {
    const minutes = Math.floor(lastTime / 60);
    const seconds = lastTime % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const convertGuessCountToEmoji = (lastGameState) => {
    const colorMap = {
      FAIL: "🟥",
      1: "🟩",
      2: "🟨",
      3: "🟧",
    };
    const emojiString = lastGameState
      .map((value) => colorMap[value] || "?")
      .join("");
    return emojiString;
  };

  const scoreEmojiString = convertGuessCountToEmoji(lastGameState);

  const formattedLastGameTime = formatLastGameTime(lastTime);
  const pastResultsText = `LMNOP #${gameNumber} ⏱️${formattedLastGameTime}\n${scoreEmojiString}\n ${lettersString}`;

  const sendResults = () => {
    if (navigator.share) {
      navigator
        .share({
          text: pastResultsText,
        })
        .then(() => console.log("Share was successful."))
        .catch((err) => console.error("Sharing failed ", err));
    } else {
      navigator.clipboard
        .writeText(pastResultsText)
        .then(() => {
          console.log("Text copied to clipboard");
          // display modal?
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  if (closePastResults) {
    return null;
  }

  return (
    <>
      <div className={styles.modalBackground}></div>
      <div className={styles.modalContainer}>
        <img
          id={styles.closeIcon}
          src={close}
          onClick={togglePastResults}
          alt="close button"
        />
        <h2 className={styles.modalTitle}>RESULTS</h2>
        <div>
          <h2 className={styles.modalHeading}>
            {formatLastGameTime(lastTime)}
          </h2>
          <div className={styles.resultsBoard}>
            {currentWordList.map((set, index) => {
              return (
                <div
                  key={set.word}
                  className={styles[`guess${lastGameState[index]}`]}
                >
                  {set.word[0].toUpperCase()}
                </div>
              );
            })}
          </div>
          <div id={styles.stats}>
            <div>
              <h3 className={styles.modalHeading}>{gamesPlayed.length}</h3>
              <p className={styles.statsDescription}>played</p>
            </div>
            <div>
              <h3 className={styles.modalHeading}>{lastGameAccuracy}</h3>
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
