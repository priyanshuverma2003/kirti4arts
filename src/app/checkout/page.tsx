'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        paymentMethod: 'upi'
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate processing (In a real app, send to backend)
        setTimeout(() => {
            clearCart();
            // For now, we just redirect
            router.push('/order-success');
        }, 1500);
    };

    if (cart.length === 0) {
        // Redirect if empty, or show message (better UX: redirect to cart or gallery)
        // For now, showing a simple message
        return (
            <div className={styles.emptyContainer}>
                <h2>Your cart is empty.</h2>
                <button onClick={() => router.push('/gallery')} className={styles.backBtn}>Return to Gallery</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Secure Checkout</h1>

            <div className={styles.layout}>
                {/* Left Column: Shipping Form */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Shipping Details</h2>
                    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
                        <div className={styles.formGroup}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Shipping Address</label>
                            <textarea
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Flat / House No / Street Name"
                                rows={3}
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="City Name"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    required
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    placeholder="000000"
                                />
                            </div>
                        </div>

                        <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Payment Method</h2>
                        <div className={styles.paymentMethods}>
                            <label className={`${styles.paymentOption} ${formData.paymentMethod === 'upi' ? styles.selected : ''}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="upi"
                                    checked={formData.paymentMethod === 'upi'}
                                    onChange={handleInputChange}
                                />
                                <div className={styles.optionContent}>
                                    <span className={styles.optionTitle}>UPI / QRCode</span>
                                    <span className={styles.optionDesc}>Pay via GPay, PhonePe, Paytm</span>
                                </div>
                            </label>

                            <label className={`${styles.paymentOption} ${formData.paymentMethod === 'bank' ? styles.selected : ''}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank"
                                    checked={formData.paymentMethod === 'bank'}
                                    onChange={handleInputChange}
                                />
                                <div className={styles.optionContent}>
                                    <span className={styles.optionTitle}>Direct Bank Transfer</span>
                                    <span className={styles.optionDesc}>Transfer directly to our bank account</span>
                                </div>
                            </label>
                        </div>

                        <button type="submit" className={styles.placeOrderBtn} disabled={loading}>
                            {loading ? 'Processing...' : `Place Order - ₹${cartTotal.toLocaleString()}`}
                        </button>
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div className={styles.summarySection}>
                    <div className={styles.summaryCard}>
                        <h3>Order Summary</h3>
                        <div className={styles.cartItems}>
                            {cart.map(item => (
                                <div key={item.id} className={styles.miniItem}>
                                    <img src={item.image} alt={item.title} />
                                    <div className={styles.miniDetails}>
                                        <span>{item.title}</span>
                                        <small>Qty: {item.quantity}</small>
                                    </div>
                                    <span className={styles.miniPrice}>₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span className={styles.totalAmount}>₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className={styles.secureBadge}>
                            🔒 AES-256 Encrypted Payment
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
