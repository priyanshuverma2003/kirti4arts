'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: ''
    });

    if (cart.length === 0) {
        if (typeof window !== 'undefined') router.push('/cart');
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderData = {
                customer: formData,
                items: cart,
                totalAmount: cartTotal,
                paymentMethod: 'Direct Admin Payment'
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (response.ok) {
                clearCart();
                router.push('/order-success');
            } else {
                alert(result.error || 'Failed to place order');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Secure Checkout</h1>

            <div className={styles.checkoutGrid}>
                {/* Shipping Form */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Shipping Details</h2>
                    <form id="checkout-form" onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="For order confirmation"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="For delivery updates"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Street Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                placeholder="House no., Street, Area"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Zip Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary & Payment */}
                <div className={styles.summarySection}>
                    <div className={styles.summaryCard}>
                        <h2 className={styles.sectionTitle}>Order Summary</h2>
                        {cart.map((item) => (
                            <div key={item.id} className={styles.summaryRow}>
                                <span>{item.title} x {item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}

                        <div className={styles.totalRow}>
                            <span>Total Amount</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                        </div>

                        {/* Direct Payment Info */}
                        <div className={styles.paymentMethods}>
                            <h4>Payment Method</h4>
                            <p style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '1rem' }}>
                                Scan the QR code or use the UPI ID below to complete your payment.
                            </p>

                            <div className={styles.qrPlaceholder}>
                                QR CODE
                            </div>

                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <p style={{ color: '#d4af37', fontWeight: 'bold' }}>UPI: kirti4arts@upi</p>
                                <p style={{ fontSize: '0.8rem', color: '#888' }}>(Example Handle)</p>
                            </div>

                            <p style={{ fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>
                                * Please confirm your order after payment.
                            </p>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            className={styles.placeOrderBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
