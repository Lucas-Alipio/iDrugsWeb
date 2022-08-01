import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <p><span>iDrugs</span> &copy; 2022</p>
            <p>Algum texto para rodapé</p>
        </footer>
    )
}

export default Footer;