'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { products } from '@/data/products';
import styles from './GallerySection.module.css';

// Helper to check if a product is a print
const isPrint = (product: any) => product.id.endsWith('-print') || product.category.toLowerCase().includes('print');

function ArtworkCard({ product, index }: { product: any; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const productIsPrint = isPrint(product);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className={styles.gridItem}
        >
            <Link
                href={`/product/${product.id}`}
                className={styles.cardWrapper}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    ref={cardRef}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className={styles.card}
                >
                    <div className={styles.imageWrapper} style={{ transform: "translateZ(30px)" }}>
                        <img src={product.image} alt={product.title} />
                        <div className={styles.badge}>
                            {productIsPrint ? 'Print Edition' : 'Original Artwork'}
                        </div>
                        <div className={styles.overlay}>
                            <span className={styles.viewLabel}>View Masterpiece</span>
                        </div>
                    </div>
                    <div className={styles.cardInfo} style={{ transform: "translateZ(50px)" }}>
                        <p className={styles.categoryLabel}>{product.category}</p>
                        <h3>{product.title}</h3>
                        <div className={styles.cardFooter}>
                            <span className={styles.price}>₹{product.price.toLocaleString()}</span>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}

interface GalleryProps {
    title?: string;
    subtitle?: string;
}

function GalleryContent({ title, subtitle }: GalleryProps) {
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const filters = ['All', 'Originals', 'Prints', 'Sketch', 'Gouache'];

    useEffect(() => {
        const catFilter = searchParams.get('filter');
        if (catFilter && filters.includes(catFilter)) {
            setFilter(catFilter);
            // Scroll to gallery if filtering from URL
            const galleryEl = document.getElementById('gallery');
            if (galleryEl) galleryEl.scrollIntoView({ behavior: 'smooth' });
        }
    }, [searchParams]);

    // Algorithmic generation of products (Originals + Prints)
    const allProducts = products.flatMap(p => {
        // If it's already a print in data, return as is
        if (isPrint(p)) return [p];

        // For originals, create a print version
        const printVersion = {
            ...p,
            id: `${p.id}-print`,
            title: `${p.title} (Print)`,
            category: `${p.category} Print`,
            price: Math.floor(p.price / 2), // Algorithm: Price divided by 2
            description: `High-quality museum-grade print of the original masterpiece '${p.title}'. ${p.description}`
        };

        return [p, printVersion];
    });

    const filteredProducts = allProducts.filter(p => {
        // Search filter
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Category filter
        if (filter === 'All') return true;
        if (filter === 'Originals') return !isPrint(p);
        if (filter === 'Prints') return isPrint(p);

        // Specific category filters
        return p.category.includes(filter);
    });

    return (
        <section className={styles.gallery} id="gallery">
            <div className={styles.header}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="gold-text">{title}</h2>
                    <p className={styles.subtitle}>{subtitle}</p>
                </motion.div>

                <div className={styles.controlBar}>
                    <div className={styles.searchWrapper}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Find your masterpiece..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles.filters}>
                        {filters.map((f, i) => (
                            <button
                                key={f}
                                className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                                {filter === f && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className={styles.activeIndicator}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <motion.div layout className={styles.masonryGrid}>
                <AnimatePresence mode='popLayout'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <ArtworkCard key={product.id} product={product} index={index} />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={styles.noResults}
                        >
                            <p>No masterpieces found matching your search.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

export default function GallerySection({
    title = "Curated Collection",
    subtitle = "A legacy of fine art, hand-crafted for the discerning collector."
}: GalleryProps) {
    return (
        <Suspense fallback={<div style={{ padding: '5rem', textAlign: 'center', color: 'var(--primary-color)' }}>Loading Masterpieces...</div>}>
            <GalleryContent title={title} subtitle={subtitle} />
        </Suspense>
    );
}
