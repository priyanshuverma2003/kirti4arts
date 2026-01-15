import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

export async function GET() {
    try {
        if (!process.env.MONGODB_URI) {
            return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 });
        }

        await connectToDatabase();
        const orders = await Order.find({}).sort({ createdAt: -1 });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Order fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

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

        // Check if MONGODB_URI is available
        if (!process.env.MONGODB_URI) {
            console.error('ERROR: MONGODB_URI is not defined in environment variables.');
            return NextResponse.json(
                { error: 'Database configuration missing. Please set MONGODB_URI in Vercel.' },
                { status: 500 }
            );
        }

        try {
            await connectToDatabase();
        } catch (dbError) {
            console.error('Database connection error:', dbError);
            return NextResponse.json(
                { error: 'Failed to connect to database. Please check Atlas IP whitelisting.' },
                { status: 500 }
            );
        }

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
            { error: error instanceof Error ? error.message : 'Failed to place order' },
            { status: 500 }
        );
    }
}
