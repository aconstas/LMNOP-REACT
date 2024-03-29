import styles from "./Keyboard.module.css";
import backspace from "../../assets/backspace.png";
import Key from "../Key/Key";
import { useCallback, useEffect } from "react";

export default function Keyboard({ addUserText, handleBackspace, checkGuess, activeGuess, correctWord }) {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback(() => {
    if (event.key === "Enter") {
      checkGuess(activeGuess, correctWord);
    } else if (event.key === "Backspace") {
      handleBackspace();
    } else {
      keys1.forEach((key) => {
        if (event.key.toUpperCase() === key.toUpperCase()) {
          addUserText(key)
        }
      })
      keys2.forEach((key) => {
        if (event.key.toUpperCase() === key.toUpperCase()) {
          addUserText(key)
        }
      })
      keys3.forEach((key) => {
        if (event.key.toUpperCase() === key.toUpperCase()) {
          addUserText(key)
        }
      })
    }
  }, [activeGuess, addUserText, checkGuess, correctWord, handleBackspace]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)
  
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    }
  }, [handleKeyboard])

  const handleEnter = () => {
    checkGuess(activeGuess, correctWord);
  };

  // console.log('keyboard has re-rendered');

  const handleKeyPress = useCallback((key) => {
    addUserText(key);
  }, [addUserText]);

  return (
    <div id={styles.keyboard} onKeyDown={handleKeyboard}>
      <div className={styles.line1}>
        {keys1.map((key) => {
          return (
            <Key keyVal={key} key={key} onKeyPress={handleKeyPress} />
          );
        })}
      </div>
      <div className={styles.line2}>
        {keys2.map((key) => {
          return <Key keyVal={key} key={key} onKeyPress={handleKeyPress} />;
        })}
      </div>
      <div className={styles.line3}>
        <div id={styles.enterKey} onClick={handleEnter}>ENTER</div>
        {keys3.map((key) => {
          return <Key keyVal={key} key={key} onKeyPress={handleKeyPress} />;
        })}
        <div id={styles.backspaceKey} onClick={handleBackspace}>
          <img src={backspace} alt="backspace key"/>
        </div>
      </div>
    </div>
  );
}
