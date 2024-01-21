import styles from "./CurrentHint.module.css";

export default function CurrentHint({ hints, activeInputIndex }) {
  const lastWordHint = hints[4];
  return <h5 id={styles.hint}>{hints[activeInputIndex] || lastWordHint}</h5>;
}
