'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send, Phone, Mail, Instagram, MapPin } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Add Web3Forms config
        // NOTE: User needs to replace YOUR_ACCESS_KEY_HERE with their actual key from web3forms.com
        data.access_key = '00000000-0000-0000-0000-000000000000'; // Placeholder
        data.subject = `🎨 New Inquiry from ${data.name} - Kirti4Arts`;
        data.from_name = 'Kirti4Arts Gallery';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.success) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Get In Touch
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Interested in a commission or have a question?
                </motion.p>
            </div>

            <div className={styles.content}>
                <div className={styles.info}>
                    <motion.div
                        className={styles.infoItem}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Instagram className={styles.icon} size={24} />
                        <div>
                            <h4>Instagram</h4>
                            <a href="https://instagram.com/kirti4arts" target="_blank" rel="noopener noreferrer">@kirti4arts</a>
                        </div>
                    </motion.div>
                    <motion.div
                        className={styles.infoItem}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <Mail className={styles.icon} size={24} />
                        <div>
                            <h4>Email</h4>
                            <a href="mailto:kirtiverma141@gmail.com">kirtiverma141@gmail.com</a>
                        </div>
                    </motion.div>
                    <motion.div
                        className={styles.infoItem}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <MapPin className={styles.icon} size={24} />
                        <div>
                            <h4>Location</h4>
                            <p>New Delhi, India</p>
                        </div>
                    </motion.div>
                </div>

                <div className={styles.formContainer}>
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                className={styles.successScreen}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <CheckCircle2 size={64} className={styles.successIcon} />
                                <h3>Thank You!</h3>
                                <p>Your message has been sent successfully. We'll get back to you soon.</p>
                                <button
                                    className={styles.resetBtn}
                                    onClick={() => setStatus('idle')}
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                className={styles.form}
                                onSubmit={handleEmailSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                layout
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

                                {status === 'error' && (
                                    <p className={styles.errorMsg}>Oops! Something went wrong. Please try again.</p>
                                )}

                                <button
                                    type="submit"
                                    className={`${styles.submitBtn} ${status === 'sending' ? styles.sending : ''}`}
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <span className={styles.spinner}></span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} className={styles.btnIcon} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
