'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export default function OrderSuccessPage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconWrapper}>
                    <CheckCircle className={styles.icon} size={80} />
                </div>

                <h1 className={styles.title}>Thank You!</h1>
                <p className={styles.subtitle}>Your order has been placed successfully.</p>

                <div className={styles.message}>
                    <p>We have received your order details.</p>
                    <p>You will receive a confirmation message on WhatsApp/Email shortly regarding the payment and shipping.</p>
                </div>

                <div className={styles.actions}>
                    <Link href="/gallery" className={styles.primaryBtn}>
                        Continue Shopping
                    </Link>
                    <Link href="/" className={styles.secondaryBtn}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
