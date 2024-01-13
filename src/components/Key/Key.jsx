import styles from "./Key.module.css";
import { useState } from "react";

export default function Key({ keyVal }) {
  const [activeKey, setActiveKey] = useState(false);

  const handleKeyClick = () => {
    setActiveKey(!activeKey);

    setTimeout(() => {
      setActiveKey(false);
    }, 10);
  };

  return (
    <div
      className={styles.key}
      onClick={() => handleKeyClick()}
      style={{ backgroundColor: activeKey && "#E5E5E5" }}
    >
      {keyVal}
    </div>
  );
}
