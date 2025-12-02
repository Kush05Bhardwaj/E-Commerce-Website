import { NextRequest, NextResponse } from 'next/server';
import { orderRepository } from '@/lib/db/repositories';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await orderRepository.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found',
        },
        { status: 404 }
      );
    }

    // TODO: Check if user has permission to view this order

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch order',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, tracking_number } = body;

    // TODO: Add authentication check for admin role

    const order = await orderRepository.updateStatus(id, status, {
      tracking_number,
      shipped_at: status === 'shipped' ? new Date() : undefined,
      delivered_at: status === 'delivered' ? new Date() : undefined,
      cancelled_at: status === 'cancelled' ? new Date() : undefined,
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update order',
      },
      { status: 500 }
    );
  }
}
