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
                        <span>Shipping Location</span>
                        <span>India</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping Cost</span>
                        <span>Free</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.total}`}>
                        <span>Total</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                    </div>

                    <button
                        className={styles.checkoutBtn}
                        onClick={() => {
                            // Admin WhatsApp number (update this with actual number)
                            const ADMIN_WHATSAPP = '918810426680'; // Format: country code + number (no spaces or +)

                            // Build detailed message with professional formatting
                            let message = `🎨 *New Order Inquiry - Kirti4Arts*\n\n`;
                            message += `Hello! I'm interested in ordering the following artworks:\n\n`;
                            message += `━━━━━━━━━━━━━━━━━━━━\n`;
                            message += `📦 *Order Details:*\n\n`;

                            // Add each cart item with detailed information
                            cart.forEach((item, index) => {
                                const itemSubtotal = item.price * item.quantity;
                                message += `${index + 1}. *${item.title}*\n`;
                                message += `   • Quantity: ${item.quantity}\n`;
                                message += `   • Price: ₹${item.price.toLocaleString()} each\n`;
                                message += `   • Subtotal: ₹${itemSubtotal.toLocaleString()}\n\n`;
                            });

                            message += `━━━━━━━━━━━━━━━━━━━━\n`;
                            message += `💰 *Total Amount: ₹${cartTotal.toLocaleString()}*\n\n`;
                            message += `Please confirm availability and share the next steps for payment and delivery.\n\n`;
                            message += `Thank you! 🙏`;

                            // Open WhatsApp with the formatted message
                            window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank');
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
