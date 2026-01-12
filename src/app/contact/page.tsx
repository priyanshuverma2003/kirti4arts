'use client';

import styles from './page.module.css';

export default function ContactPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h2>Get In Touch</h2>
                <p>Interested in a commission or have a question?</p>
            </div>

            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.infoItem}>
                        <h4>Instagram</h4>
                        <a href="https://instagram.com/kirti4arts" target="_blank" rel="noopener noreferrer">@kirti4arts</a>
                    </div>
                    <div className={styles.infoItem}>
                        <h4>Email</h4>
                        <a href="mailto:kirtiverma141@gmail.com">kirtiverma141@gmail.com</a>
                    </div>
                    <div className={styles.infoItem}>
                        <h4>Phone</h4>
                        <a href="tel:+918810426680">+91 8810426680</a>
                    </div>
                    <div className={styles.infoItem}>
                        <h4>Location</h4>
                        <p>New Delhi, India</p>
                    </div>
                </div>

                <div className={styles.formContainer}>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <input type="text" placeholder="Your Name" required />
                        </div>
                        <div className={styles.formGroup}>
                            <input type="email" placeholder="Your Email" required />
                        </div>
                        <div className={styles.formGroup}>
                            <textarea placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className={styles.submitBtn}>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
