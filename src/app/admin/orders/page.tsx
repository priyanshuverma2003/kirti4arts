'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Package, MapPin, Phone, Mail, Clock, CheckCircle, Truck, Info, X } from 'lucide-react';

interface Order {
    _id: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        zipCode: string;
    };
    items: Array<{
        title: string;
        price: number;
        quantity: number;
    }>;
    totalAmount: number;
    status: string;
    createdAt: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const checkPassword = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would be a proper session/JWT
        // For simplicity, we use a simple client-side check linked to a placeholder or env variable
        if (password === 'admin952') { // Simple placeholder password
            setIsAuthenticated(true);
        } else {
            alert('Invalid Password');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
        }
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders');
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                fetchOrders();
                if (selectedOrder?._id === id) {
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                }
            }
        } catch (error) {
            alert('Failed to update status');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <h1 className={styles.title}>Admin Access</h1>
                    <form onSubmit={checkPassword}>
                        <input
                            type="password"
                            className={styles.loginInput}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className={styles.loginBtn}>Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.dashboardHeader}>
                <h1 className={styles.title}>Orders Dashboard</h1>
                <button onClick={() => window.location.reload()} className={styles.loginBtn} style={{ width: 'auto' }}>
                    Refresh
                </button>
            </div>

            {isLoading ? (
                <p style={{ textAlign: 'center' }}>Loading masterpieces...</p>
            ) : (
                <div className={styles.orderGrid}>
                    {orders.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>No orders found yet.</p>
                    ) : (
                        orders.map(order => (
                            <div key={order._id} className={styles.orderCard}>
                                <div className={styles.customerInfo}>
                                    <h3>{order.customer.name}</h3>
                                    <p><Clock size={14} /> {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className={styles.orderMeta}>
                                    <div className={styles.amount}>₹{order.totalAmount.toLocaleString()}</div>
                                    <div className={styles.date}>{order.items.length} Items</div>
                                </div>
                                <div>
                                    <span className={`${styles.statusBadge} ${styles['status_' + order.status]}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        className={styles.loginBtn}
                                        style={{ width: 'auto', padding: '0.5rem 1rem' }}
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <Info size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Modal for Order Details */}
            {selectedOrder && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeBtn} onClick={() => setSelectedOrder(null)}><X /></button>
                        <h2 className={styles.title} style={{ fontSize: '2rem' }}>Order Details</h2>

                        <div className={styles.detailGrid}>
                            <div className={styles.detailSection}>
                                <h4><MapPin size={18} /> Customer Details</h4>
                                <p><strong>{selectedOrder.customer.name}</strong></p>
                                <p><Mail size={14} /> {selectedOrder.customer.email}</p>
                                <p><Phone size={14} /> {selectedOrder.customer.phone}</p>
                                <p>{selectedOrder.customer.address}</p>
                                <p>{selectedOrder.customer.city} - {selectedOrder.customer.zipCode}</p>
                            </div>

                            <div className={styles.detailSection}>
                                <h4><Package size={18} /> Update Status</h4>
                                <select
                                    className={styles.statusSelect}
                                    value={selectedOrder.status}
                                    onChange={(e) => updateStatus(selectedOrder._id, e.target.value)}
                                >
                                    <option value="New">New</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.detailSection} style={{ borderBottom: 'none' }}>
                            <h4><Package size={18} /> Items Ordered</h4>
                            {selectedOrder.items.map((item, idx) => (
                                <div key={idx} className={styles.itemRow}>
                                    <span>{item.title} x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className={styles.itemRow} style={{ borderTop: '2px solid #d4af37', marginTop: '1rem', fontWeight: 700 }}>
                                <span>Grand Total</span>
                                <span>₹{selectedOrder.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
