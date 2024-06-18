import styles from "./NewsTicker.module.css";
import logo from "../../assets/icons/Favicon32x32.png";

export default function NewsTicker() {
  return (
    <div className={styles.rssBlock}>
      <div className={styles.marquee}>
        <span className={styles.marqueeContent}>
          CALLING ALL LMNOP PLAYERS! CLICK THE 'CREATE' BUTTON IN THE RESULTS
          POP-UP TO CREATE YOUR OWN WORD SETS TO CHALLENGE YOUR FRIENDS!
          <img src={logo} style={{margin: "0 3px 0 12px"}}/>
        </span>
        <span className={styles.marqueeContent}>
          CALLING ALL LMNOP PLAYERS! CLICK THE 'CREATE' BUTTON IN THE RESULTS
          POP-UP TO CREATE YOUR OWN WORD SETS TO CHALLENGE YOUR FRIENDS!
          <img src={logo} style={{margin: "0 3px 0 12px"}} />
        </span>
      </div>
    </div>
  );
}