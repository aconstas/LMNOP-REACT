import styles from './Navbar.module.css';
import settings from '../../assets/settings.png';
import help from '../../assets/help.png';

export default function Navbar({showInstructions, setShowInstructions}) {
    console.log('navbar re-rendered');
    const toggleInstructions = () => {
        console.log('clicked!')
        setShowInstructions(!showInstructions);
    }
    return (
        <header id={styles.header} className={showInstructions ? styles.blurred : undefined}>
            <h1 id={styles.title}>LMNOP</h1>
            <div id={styles.buttons}>
                <img src={settings} className={styles.icons} alt='settings icon'/>
                <img src={help} className={styles.icons} onClick={toggleInstructions} alt='instructions icon'/>
            </div>
        </header>
    );
}