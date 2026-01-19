import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.col}>
                    <h4>Kirti4Arts</h4>
                    <p>Capturing emotion and beauty through gouache, charcoal,graphite and acrylic. Every piece is a journey.</p>
                </div>
                <div className={styles.col}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/gallery">Gallery</a></li>
                        <li><a href="/about">About Artist</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h4>Connect</h4>
                    <div className={styles.socialLinks}>
                        <a href="https://instagram.com/kirti4arts" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="mailto:kirtiverma141@gmail.com">Email</a>
                    </div>
                    <p>New Delhi, India</p>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} Kirti4Arts. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
