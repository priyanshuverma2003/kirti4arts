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
                        <h4>Location</h4>
                        <p>New Delhi, India</p>
                    </div>
                </div>

                <div className={styles.formContainer}>
                    <form
                        className={styles.form}
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const name = formData.get('name');
                            const phone = formData.get('phone');
                            const email = formData.get('email');
                            const message = formData.get('message');

                            const adminEmail = 'kirtiverma141@gmail.com';
                            const subject = `🎨 New Inquiry from ${name} - Kirti4Arts`;
                            const body = `Hello Kirti,\n\nYou have a new message from your website contact form:\n\n` +
                                `👤 Name: ${name}\n` +
                                `📞 Phone: ${phone}\n` +
                                `📧 Email: ${email}\n\n` +
                                `✉️ Message:\n${message}\n\n` +
                                `Regards,\nKirti4Arts Website`;

                            window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}
                    >
                        <div className={styles.formGroup}>
                            <input name="name" type="text" placeholder="Your Name" required />
                        </div>
                        <div className={styles.formGroup}>
                            <input name="phone" type="tel" placeholder="Your Phone Number" required />
                        </div>
                        <div className={styles.formGroup}>
                            <input name="email" type="email" placeholder="Your Email" required />
                        </div>
                        <div className={styles.formGroup}>
                            <textarea name="message" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className={styles.submitBtn}>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
