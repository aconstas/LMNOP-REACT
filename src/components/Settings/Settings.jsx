import close from "../../assets/close.png";
import styles from "../../shared/styles/modal.module.css";
export default function Settings({showSettings, setShowSettings}) {

const toggleSettings = () => {
    setShowSettings(!showSettings);
}
  return (
    <>
      <div className={styles.modalBackground}></div>
      <div id={styles.instructionsContainer}>
        <img
          id={styles.closeIcon}
          src={close}
          onClick={toggleSettings}
          alt="close button"
        />
        <p className={styles.modalText}> Got some feedback for us?</p>
        <a href="https://forms.gle/gskhE39PCuBP41Ty7" target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
            <button className={styles.modalButton}>GIVE FEEDBACK</button>
        </a>
      </div>
    </>
  );
}
