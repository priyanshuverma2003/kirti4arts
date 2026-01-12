'use client';

import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero} id="hero">
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h1 className="fade-in-up">Art That Speaks</h1>
                <p className="fade-in-up">Discover unique originals, prints, and sketches by Kirti Verma.</p>
                <Link href="/gallery" className={`${styles.ctaButton} fade-in-up`}>
                    View Collection
                </Link>
            </div>
        </section>
    );
}
