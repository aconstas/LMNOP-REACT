import styles from "../../shared/styles/modal.module.css";
import close from "../../assets/close.png";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect, useCallback, useState } from "react";
import dayjs from "dayjs";

import { useStopwatch } from "../../contexts/stopwatchContext";
import PastResults from "../PastResults/PastResults";

export default function Results({
  guessCount,
  currentWordList,
  gameNumber,
  showResults,
  setShowResults,
  setIsModalOpen,
  currentDate,
  lastPlayed,
  setLastPlayed,
  gamesPlayed,
}) {
  const { time } = useStopwatch();
  const [lastGameState, setLastGameState] = useLocalStorage(
    "lastGameState",
    []
  );
  const [lastGameTime, setLastGameTime] = useLocalStorage("lastGameTime", 0);
  const [lastGameAccuracy, setLastGameAccuracy] = useLocalStorage(
    "lastGameAccuracy",
    0
  );
  const [streak] = useLocalStorage("streak");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const convertGuessCountToEmoji = (guessCount) => {
    const colorMap = {
      FAIL: "🟥",
      1: "🟩",
      2: "🟨",
      3: "🟧",
    };
    const emojiString = guessCount
      .map((value) => colorMap[value] || "?")
      .join("");
    return emojiString;
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const scoreEmojiString = convertGuessCountToEmoji(guessCount);

  const lettersString = currentWordList
    .map((set) => set.word[0].toUpperCase())
    .join("   ");

  const formattedTime = formatTime(time);
  const resultsText = `LMNOP #${gameNumber} ⏱️${formattedTime}\n${scoreEmojiString}\n ${lettersString}\n https://lmnopgame.com`;

  const showAlert = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 1200);
  };

  const sendResults = () => {
    if (navigator.share) {
      navigator
        .share({
          text: resultsText,
        })
        .then(() => console.log("Share was successful."))
        .catch((err) => console.error("Sharing failed ", err));
    } else {
      navigator.clipboard
        .writeText(resultsText)
        .then(() => {
          showAlert();
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  const closeResults = () => {
    setShowResults(false);
    setIsModalOpen(false);
  };

  function calculateTotalPoints(guessCount) {
    let totalPoints = 0;

    for (const guess of guessCount) {
      if (guess === "FAIL") {
        continue;
      } else {
        totalPoints += 4 - guess;
      }
    }

    return totalPoints;
  }

  function calculateAccuracy(guessCount) {
    const percentage = (calculateTotalPoints(guessCount) / 15) * 100;
    if (percentage % 1 === 0) {
      return percentage + "%";
    } else {
      return percentage.toFixed(1) + "%";
    }
  }

  // const addGameNumber = useCallback(
  //   (gameNumber) => {
  //     const updatedGamesPlayed = [...gamesPlayed, gameNumber];
  //     setGamesPlayed(updatedGamesPlayed);
  //   },
  //   [gamesPlayed, setGamesPlayed]
  // );

  useEffect(() => {
    // function updateStreak(lastPlayed) {
    //   console.log(lastPlayed, dayjs().subtract(1, "day").format("YYYY-MM-DD"));
    //   if (lastPlayed === dayjs().subtract(1, "day").format("YYYY-MM-DD")) {
    //     const updatedStreak = streak + 1;
    //     setStreak(updatedStreak);
    //     console.log('updating streak');
    //   } else {
    //     console.log('resetting streak');
    //     setStreak(1);
    //   }
    // }
    const lastGameNumber = gamesPlayed.at(-1);
    if (!lastGameNumber || gameNumber === lastGameNumber) {
      setLastGameState(guessCount);
      setLastGameTime(time);
      setLastGameAccuracy(accuracy);
      // updateStreak(lastPlayed);
    }
  }, []);

  const accuracy = calculateAccuracy(guessCount);
  const played = useLocalStorage("gamesPlayed")[0].length;

  useEffect(() => {
    if (lastPlayed === currentDate) {
      console.log("already played");
    }
  }, [lastPlayed, currentDate]);

  if (!time && lastPlayed === currentDate) {
    return (
      <PastResults
        lastPlayed={lastPlayed}
        lastGameState={lastGameState}
        currentWordList={currentWordList}
        lastGameAccuracy={lastGameAccuracy}
        gamesPlayed={gamesPlayed}
        lettersString={lettersString}
        gameNumber={gameNumber}
        showResults={showResults}
      />
    );
  }

  if (!showResults) {
    return null;
  }

  return (
    <>
      <div className={styles.modalBackground}></div>
      {isAlertVisible && <div id={styles.miniPopUp}>Copied to clipboard</div>}
      <div className={styles.modalContainer}>
        <img
          id={styles.closeIcon}
          src={close}
          onClick={closeResults}
          alt="close button"
        />
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
              <h3 className={styles.modalHeading}>{played}</h3>
              <p className={styles.statsDescription}>played</p>
            </div>
            <div>
              <h3 className={styles.modalHeading}>{accuracy}</h3>
              <p className={styles.statsDescription}>accuracy</p>
            </div>
            <div>
              <h3 className={styles.modalHeading}>{streak}</h3>
              <p className={styles.statsDescription}>streak</p>
            </div>
          </div>
        </div>
        <button className={styles.modalButton} onClick={sendResults}>
          SHARE
        </button>
        <div style={{display: "flex", flexDirection: "column", gap: 4}}>
          <a
            href="https://forms.gle/gskhE39PCuBP41Ty7"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button id={styles.feedbackButton} style={{ fontSize: "24px" }}>
              GIVE FEEDBACK
            </button>
          </a>
          <a
            href="https://forms.gle/jsuKMKwdkrTRMNQm7"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button id={styles.createButton} style={{ fontSize: "24px" }}>
              CREATE
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
