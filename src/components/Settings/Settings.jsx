import close from "../../assets/close.png";
import styles from "../../shared/styles/modal.module.css";
import { useState } from "react";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";

export default function Settings({showSettings, setShowSettings}) {

const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

const toggleSettings = () => {
    setShowSettings(!showSettings);
}

const togglePrivacyPolicy = () => {
    setShowPrivacyPolicy(!showPrivacyPolicy);
}

if (showPrivacyPolicy) {
    return <PrivacyPolicy togglePrivacyPolicy={togglePrivacyPolicy}/>
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
        <p className={styles.modalText} style={{textAlign: 'center'}}> Got some feedback for us?</p>
        <a href="https://forms.gle/gskhE39PCuBP41Ty7" target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
            <button className={styles.modalButton} style={{fontSize: '24px'}}>GIVE FEEDBACK</button>
        </a>
        <p className={styles.modalText} style={{textAlign: 'center'}}>Something else?</p>
        <a href="mailto:lmnopgame@gmail.com" style={{textDecoration: 'none'}}>
            <button className={styles.modalButton} style={{fontSize: '24px'}}>EMAIL US</button>
        </a>
      <p style={{fontFamily:'Space Grotesk, sans-serif', position:'absolute', bottom:'0', left:'50%', transform:'translate(-50%, -50%)'}} onClick={togglePrivacyPolicy}><u>Privacy Policy</u></p>
      </div>
    </>
  );
}
