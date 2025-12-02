import { NextRequest, NextResponse } from 'next/server';
import { cartRepository } from '@/lib/db/repositories';

export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from session/auth
    const userId = request.headers.get('x-user-id');
    const sessionId = request.cookies.get('session_id')?.value;

    if (!userId && !sessionId) {
      return NextResponse.json({
        success: true,
        data: { items: [] },
      });
    }

    let cart;
    if (userId) {
      cart = await cartRepository.findByUserId(userId);
    } else if (sessionId) {
      cart = await cartRepository.findBySessionId(sessionId);
    }

    return NextResponse.json({
      success: true,
      data: cart || { items: [] },
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch cart',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity, price, attributes } = body;

    // TODO: Get userId from session/auth
    const userId = request.headers.get('x-user-id');
    let sessionId = request.cookies.get('session_id')?.value;

    // Create session ID for guest users
    if (!userId && !sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    }

    // Get or create cart
    let cart;
    if (userId) {
      cart = await cartRepository.findByUserId(userId);
      if (!cart) {
        cart = await cartRepository.createCart(userId);
      }
    } else if (sessionId) {
      cart = await cartRepository.findBySessionId(sessionId);
      if (!cart) {
        cart = await cartRepository.createCart(undefined, sessionId);
      }
    }

    if (!cart) {
      throw new Error('Failed to create cart');
    }

    // Add item to cart
    const item = await cartRepository.addItem(
      cart.id,
      productId,
      quantity,
      price,
      attributes
    );

    const response = NextResponse.json({
      success: true,
      data: item,
    }, { status: 201 });

    // Set session cookie for guest users
    if (!userId && sessionId) {
      response.cookies.set('session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add item to cart',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const itemId = searchParams.get('itemId');

    if (!itemId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Item ID is required',
        },
        { status: 400 }
      );
    }

    const removed = await cartRepository.removeItem(itemId);

    return NextResponse.json({
      success: true,
      data: { removed },
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to remove item from cart',
      },
      { status: 500 }
    );
  }
}
