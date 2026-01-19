'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutSection.module.css';

export default function AboutSection() {
    return (
        <section className={styles.aboutSection} id="about">
            <div className={styles.header}>
                <h2>Artist Behind the Brush</h2>
            </div>

            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageContainer}>
                        {/* Using a standard img tag for external check or configured Next Image */}
                        <img src="/MYPIC.jpg" alt="Kirti Verma" />
                    </div>
                </div>

                <div className={styles.textWrapper}>
                    <h3>Kirti Verma</h3>
                    <p>
                        Welcome to my creative world. I specialize in gouache paintings, charcoal portraits,
                        and artistic sketches that capture emotion and beauty. Every piece is a journey.
                    </p>
                    <Link href="/about" className={styles.secondaryBtn}>
                        Read Full Bio
                    </Link>
                </div>
            </div>
        </section>
    );
}
