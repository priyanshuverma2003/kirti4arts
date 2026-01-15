'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './HeroSlideshow.module.css';

const slides = [



    {
        id: 1,
        image: '/artistic-eye-gouache.png',
        title: 'The Artistic Eye',
        subtitle: 'Visionary Perspectives',
        position: 'center'
    },
    {
        id: 2,
        image: '/silent-gaze.png',
        title: 'Silent Gaze',
        subtitle: 'Contemporary Portrait',
        position: 'center 20%'
    },
    {
        id: 3,
        image: '/van-sunset-gouache.png',
        title: 'Van Life Sunset',
        subtitle: 'Bohemian Dreams',
        position: 'center'
    },
    {
        id: 4,
        image: '/autumn-reading.jpg',
        title: 'Autumn Comfort',
        subtitle: 'Cozy Aesthetics',
        position: 'center'
    },
    {
        id: 5,
        image: '/lake-sunset.jpg',
        title: 'Serene Lake Sunset',
        subtitle: 'Nature\'s Gold',
        position: 'center'
    },

];

export default function HeroSlideshow() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.hero}>
            <AnimatePresence>
                <motion.div
                    key={current}
                    className={styles.slideBackground}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 2.5, ease: "linear" }}
                    style={{
                        backgroundImage: `url(${slides[current].image})`,
                        backgroundPosition: (slides[current] as any).position || 'center'
                    }}
                >
                    <div className={styles.overlay} />
                    <div className={styles.vignette} />
                </motion.div>
            </AnimatePresence>

            <div className={styles.content}>
                <AnimatePresence>
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={styles.textContainer}
                    >
                        <h2 className={styles.subtitle}>{slides[current].subtitle}</h2>
                        <h1 className={styles.title}>{slides[current].title}</h1>
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <Link href="/gallery" className={styles.ctaButton}>
                        Explore Collection
                    </Link>
                </motion.div>
            </div>

            <div className={styles.indicators}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === current ? styles.active : ''}`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </section>
    );
}
