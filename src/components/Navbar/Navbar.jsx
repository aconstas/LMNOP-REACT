import styles from './Navbar.module.css';
import settings from '../../assets/settings.png';
import help from '../../assets/help.png';

export default function Navbar() {
    console.log('navbar re-rendered');
    return (
        <header id={styles.header}>
            <h1 id={styles.title}>LMNOP</h1>
            <div id={styles.buttons}>
                <img src={settings} className={styles.icons} alt='settings icon'/>
                <img src={help} className={styles.icons} alt='help icon'/>
            </div>
        </header>
    );
}