'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './page.module.css';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven&apos;t added any art yet.</p>
                <Link href="/gallery" className={styles.continueBtn}>Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Your Cart</h2>
            </div>

            <div className={styles.cartGrid}>
                <div className={styles.cartItems}>
                    {cart.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                            <div className={styles.itemImage}>
                                <img src={item.image} alt={item.title} />
                            </div>

                            <div className={styles.itemDetails}>
                                <h3>{item.title}</h3>
                                <p className={styles.price}>₹{item.price.toLocaleString()}</p>

                                <div className={styles.controls}>
                                    <div className={styles.quantity}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <h3>Order Summary</h3>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.total}`}>
                        <span>Total</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                    </div>

                    <button className={styles.checkoutBtn}>Checkout</button>
                    <p className={styles.secureNote}>🔒 Secure Checkout</p>
                </div>
            </div>
        </div>
    );
}
