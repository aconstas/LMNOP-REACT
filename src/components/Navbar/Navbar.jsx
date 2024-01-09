import styles from './Navbar.module.css';
import settings from '../../assets/settings.png';
import help from '../../assets/help.png';

export default function Navbar() {
    return (
        <header id={styles.header}>
            <h1 id={styles.title}>LMNOP</h1>
            <div id={styles.buttons}>
                <img src={settings} className={styles.icons}/>
                <img src={help} className={styles.icons}/>
            </div>
        </header>
    );
}