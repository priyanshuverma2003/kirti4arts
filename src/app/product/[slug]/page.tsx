'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function ProductPage() {
    const { slug } = useParams();
    const { addToCart } = useCart();
    const product = products.find((p) => p.id === slug);

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
                        <p><strong>Dimensions:</strong> 12 x 16 inches (Approx)</p>
                        <p><strong>Medium:</strong> {product.category}</p>
                        <p><strong>Shipping:</strong> Worldwide</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
