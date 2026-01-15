import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.customer || !body.items || body.items.length === 0) {
            return NextResponse.json(
                { error: 'Invalid order data' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const newOrder = await Order.create({
            customer: body.customer,
            items: body.items,
            totalAmount: body.totalAmount,
            paymentMethod: body.paymentMethod || 'Direct Payment',
            status: 'New'
        });

        return NextResponse.json({
            success: true,
            message: 'Order placed successfully',
            orderId: newOrder._id
        }, { status: 201 });

    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { error: 'Failed to place order' },
            { status: 500 }
        );
    }
}
