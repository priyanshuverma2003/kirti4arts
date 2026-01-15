import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

export interface IOrder extends Document {
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        zipCode: string;
    };
    items: IOrderItem[];
    totalAmount: number;
    paymentMethod: string; // 'UPI' | 'Bank Transfer'
    paymentStatus: string; // 'Pending' | 'Completed'
    status: string; // 'New' | 'Processing' | 'Shipped'
    createdAt: Date;
}

const OrderSchema: Schema = new Schema({
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    items: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String },
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'Direct Payment' },
    paymentStatus: { type: String, default: 'Pending' },
    status: { type: String, default: 'New' },
    createdAt: { type: Date, default: Date.now },
});

// Prevent model recompilation error in development
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
