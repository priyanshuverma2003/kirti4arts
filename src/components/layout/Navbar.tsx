'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Palette, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredResults = searchQuery.length > 2
        ? products.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5)
        : [];

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logoContainer} onClick={() => setMobileMenuOpen(false)}>
                    <Palette className={styles.logoIcon} size={28} />
                    <h1 className={styles.logo}>
                        Kirti<span className={styles.goldText}>4</span>Arts
                    </h1>
                </Link>

                <AnimatePresence>
                    {(mobileMenuOpen || typeof window !== 'undefined' && window.innerWidth > 768) && (
                        <motion.div
                            className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`}
                            initial={typeof window !== 'undefined' && window.innerWidth <= 768 ? { x: '100%' } : {}}
                            animate={typeof window !== 'undefined' && window.innerWidth <= 768 ? { x: mobileMenuOpen ? 0 : '100%' } : {}}
                            exit={typeof window !== 'undefined' && window.innerWidth <= 768 ? { x: '100%' } : {}}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            drag={typeof window !== 'undefined' && window.innerWidth <= 768 ? "x" : false}
                            dragConstraints={{ left: 0, right: 300 }}
                            dragElastic={0.05}
                            onDragEnd={(_, info) => {
                                if (info.offset.x > 100) {
                                    setMobileMenuOpen(false);
                                }
                            }}
                        >
                            <Link href="/" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
                            <Link href="/about" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>About</Link>
                            <Link href="/gallery" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
                            <Link href="/contact" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={styles.actions}>
                    <div className={styles.searchContainer}>
                        <div className={`${styles.searchBar} ${showSearch ? styles.expanded : ''}`}>
                            <Search
                                className={styles.searchIcon}
                                size={20}
                                onClick={() => setShowSearch(!showSearch)}
                            />
                            <input
                                type="text"
                                placeholder="Search artworks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                                onBlur={() => setTimeout(() => setShowSearch(false), 250)}
                                onFocus={() => setShowSearch(true)}
                            />
                        </div>

                        {showSearch && (
                            <div className={styles.searchResults}>
                                {searchQuery.length <= 2 ? (
                                    <div className={styles.quickBrowse}>
                                        <span className={styles.sectionTitle}>Quick Browse</span>
                                        <div className={styles.categoryLinks}>
                                            {['Originals', 'Prints', 'Sketch', 'Gouache'].map(cat => (
                                                <Link
                                                    key={cat}
                                                    href={`/gallery?filter=${cat}`}
                                                    className={styles.catLink}
                                                    onClick={() => setShowSearch(false)}
                                                >
                                                    {cat}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {filteredResults.length > 0 ? (
                                            filteredResults.map(p => (
                                                <Link
                                                    key={p.id}
                                                    href={`/product/${p.id}`}
                                                    className={styles.resultItem}
                                                    onClick={() => {
                                                        setSearchQuery('');
                                                        setShowSearch(false);
                                                    }}
                                                >
                                                    <img src={p.image} alt={p.title} className={styles.resultThumb} />
                                                    <div className={styles.resultInfo}>
                                                        <span className={styles.resultTitle}>{p.title}</span>
                                                        <span className={styles.resultCategory}>{p.category}</span>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className={styles.noResults}>No masterpieces found.</div>
                                        )}
                                        <div className={styles.viewAll}>
                                            <Link href="/gallery" onClick={() => setShowSearch(false)}>
                                                View all results
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <Link href="/cart" className={styles.cartIcon}>
                        <div className={styles.cartWrapper}>
                            <ShoppingBag size={24} />
                            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                        </div>
                    </Link>

                    <button
                        className={styles.mobileToggle}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>


        </nav>
    );
}

