'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Don't render on mobile/touch devices
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) return null;

    return (
        <>
            <motion.div
                className={styles.cursor}
                animate={{
                    x: mousePosition.x - 10,
                    y: mousePosition.y - 10,
                    scale: isHovered ? 1.5 : 1,
                    backgroundColor: isHovered ? 'var(--primary-color)' : 'transparent',
                    borderColor: 'var(--primary-color)'
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            />
            <motion.div
                className={styles.cursorFollower}
                animate={{
                    x: mousePosition.x - 24,
                    y: mousePosition.y - 24,
                    scale: isHovered ? 0.5 : 1,
                    opacity: isHovered ? 0 : 0.5
                }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            />
        </>
    );
}
