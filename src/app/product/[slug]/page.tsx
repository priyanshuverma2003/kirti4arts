'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function ProductPage() {
    const { slug } = useParams();
    const { addToCart } = useCart();

    // Logic to handle dynamic print versions
    const isPrintSlug = typeof slug === 'string' && slug.endsWith('-print');
    const originalSlug = isPrintSlug ? (slug as string).replace('-print', '') : slug;

    const originalProduct = products.find((p) => p.id === originalSlug);

    let product = originalProduct;

    if (originalProduct && isPrintSlug) {
        // Create the print version on the fly
        product = {
            ...originalProduct,
            id: slug as string,
            title: `${originalProduct.title} (Print)`,
            category: `${originalProduct.category} Print`,
            price: Math.floor(originalProduct.price / 2),
            description: `High-quality museum-grade print of the original masterpiece '${originalProduct.title}'. ${originalProduct.description}`
        };
    }

    if (!product) {
        return (
            <div className={styles.notFound}>
                <h2>Artwork Not Found</h2>
                <Link href="/gallery">Back to Gallery</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
        alert('Added to cart!');
    };

    return (
        <div className={styles.container}>
            <Link href="/gallery" className={styles.backLink}>← Back to Gallery</Link>

            <div className={styles.productWrapper}>
                <div className={styles.imageSection}>
                    <div className={styles.imageContainer}>
                        <img src={product.image} alt={product.title} />
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h1>{product.title}</h1>
                    <p className={styles.category}>{product.category}</p>
                    <p className={styles.price}>₹{product.price.toLocaleString()}</p>

                    <div className={styles.description}>
                        <p>{product.description}</p>
                        <p>
                            Handcrafted with attention to detail. This piece is a unique addition
                            to any collection, bringing warmth and emotion to your space.
                        </p>
                    </div>

                    <button
                        className={styles.addToCartBtn}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>

                    <div className={styles.details}>
                        {product.dimensions && <p><strong>Dimensions:</strong> {product.dimensions}</p>}
                        <p><strong>Medium:</strong> {product.category}</p>
                        <p><strong>Shipping:</strong> Worldwide</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
