import { NextRequest, NextResponse } from 'next/server';
import { orderRepository } from '@/lib/db/repositories';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // TODO: Get userId from session/auth
    const userId = request.headers.get('x-user-id');
    
    const options = {
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
      userId: userId || undefined,
      status: searchParams.get('status') || undefined,
    };

    const { orders, total } = await orderRepository.findAll(options);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        total,
        limit: options.limit,
        offset: options.offset,
        pages: Math.ceil(total / options.limit),
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch orders',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Get userId from session/auth
    const userId = request.headers.get('x-user-id');
    
    const { items, ...orderData } = body;
    
    const order = await orderRepository.create(
      {
        ...orderData,
        user_id: userId || undefined,
      },
      items
    );

    return NextResponse.json({
      success: true,
      data: order,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order',
      },
      { status: 500 }
    );
  }
}
