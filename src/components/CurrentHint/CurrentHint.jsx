import styles from "./CurrentHint.module.css";

export default function CurrentHint({ hints, activeInputIndex }) {
  return <h5 id={styles.hint}>{hints[activeInputIndex]}</h5>;
}
