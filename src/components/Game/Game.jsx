import CurrentHint from "../CurrentHint/CurrentHint";
import GuessInput from "../GuessInput/GuessInput";
import Timer from "../Timer/Timer";
import styles from "./Game.module.css";

export default function Game({
  gameStarted,
  userGuess,
  currentWordlist,
  activeInputIndex,
  hints,
  shakeIncorrect,
  setShakeIncorrect,
  guessCount,
  lastPlayed,
  currentDate,
}) {
  // console.log('game rendered');

  return (
    <div>
      <CurrentHint hints={hints} activeInputIndex={activeInputIndex} lastPlayed={lastPlayed} currentDate={currentDate}/>
      <div id={styles.guessInputContainer}>
        {currentWordlist.map((wordSet, index) => {
          return (
            <GuessInput
              key={wordSet.word}
              userGuess={userGuess}
              correctWord={wordSet.word.toUpperCase()}
              isActive={index === activeInputIndex}
              shakeIncorrect={shakeIncorrect}
              setShakeIncorrect={setShakeIncorrect}
              guessCount={guessCount}
              wordSetIndex={index}
              lastPlayed={lastPlayed}
              currentDate={currentDate}
            />
          );
        })}
      </div>
        <Timer gameStarted={gameStarted} lastPlayed={lastPlayed} currentDate={currentDate} />
    </div>
  );
}
