import styles from "./Keyboard.module.css";

export default function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div id={styles.keyboard}>
      <div className={styles.line1}>
        {keys1.map((key) => {
          return <div key={key}>{key}</div>;
        })}
      </div>
      <div className={styles.line2}>
        {keys2.map((key) => {
          return <div key={key}>{key}</div>;
        })}
      </div>
      <div className={styles.line3}>
        {keys3.map((key) => {
          return <div key={key}>{key}</div>;
        })}
      </div>
    </div>
  );
}
