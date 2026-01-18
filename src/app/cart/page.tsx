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
                            </div>

                            <div className={styles.controls}>
                                <div className={styles.quantity}>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                                    REMOVE
                                </button>
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
                        <span>Calculated during order</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.total}`}>
                        <span>Total</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                    </div>

                    <button
                        className={styles.checkoutBtn}
                        onClick={() => {
                            const message = `Hi Kirti, I'd like to order the following art:\n\n${cart.map(item => `- ${item.title} (${item.quantity}x) - ₹${item.price.toLocaleString()}`).join('\n')}\n\nTotal: ₹${cartTotal.toLocaleString()}\n\nPlease let me know the next steps!`;
                            window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                    >
                        Order via WhatsApp
                    </button>
                    <p className={styles.secureNote}>Order will be processed via direct contact</p>
                </div>
            </div>

            <div className={styles.processSection}>
                <h3>The Art Collection Process</h3>
                <div className={styles.processSteps}>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>01</div>
                        <h4>Initial Inquiry</h4>
                        <p>Click "Order via WhatsApp" to send your selection. We'll discuss any specific preferences or framing options.</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>02</div>
                        <h4>Confirmation</h4>
                        <p>We'll verify availability and confirm shipping details including taxes and delivery timelines.</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>03</div>
                        <h4>Direct Payment</h4>
                        <p>Complete your purchase through direct bank transfer or UPI (details provided during chat) for maximum security.</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>04</div>
                        <h4>Handcrafted Delivery</h4>
                        <p>Once payment is confirmed, your art will be carefully packaged and shipped with dedicated tracking.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
