import styles from "./Keyboard.module.css";
import backspace from "../../assets/backspace.png";
import { useState } from "react";

export default function Keyboard({ isModalOpen }) {
  const [activeKey, setActiveKey] = useState(null);

  const handleKeyClick = (key) => {
    setActiveKey(key);

    setTimeout(() => {
      setActiveKey(null);
    }, 50);
  };

  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div id={styles.keyboard} className={isModalOpen ? styles.blurred : null}>
      <div className={styles.line1}>
        {keys1.map((key) => {
          return (
            <div
              key={key}
              className={styles.key}
              onClick={() => handleKeyClick(key)}
              style={{ backgroundColor: activeKey === key && "#E5E5E5" }}
            >
              {key}
            </div>
          );
        })}
      </div>
      <div className={styles.line2}>
        {keys2.map((key) => {
          return (
            <div
              key={key}
              className={styles.key}
              onClick={() => handleKeyClick(key)}
              style={{ backgroundColor: activeKey === key && "#E5E5E5" }}
            >
              {key}
            </div>
          );
        })}
      </div>
      <div className={styles.line3}>
        <div id={styles.enterKey}>ENTER</div>
        {keys3.map((key) => {
          return (
            <div
              key={key}
              className={styles.key}
              onClick={() => handleKeyClick(key)}
              style={{ backgroundColor: activeKey === key && "#E5E5E5" }}
            >
              {key}
            </div>
          );
        })}
        <div id={styles.backspaceKey}>
          <img src={backspace} />
        </div>
      </div>
    </div>
  );
}
