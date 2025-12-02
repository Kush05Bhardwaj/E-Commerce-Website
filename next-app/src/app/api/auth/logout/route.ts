import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { authService } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'No token provided',
        },
        { status: 401 }
      );
    }

    const payload = authService.verifyAccessToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid token',
        },
        { status: 401 }
      );
    }

    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (refreshToken) {
      await authService.removeRefreshToken(payload.userId, refreshToken);
    }

    const response = NextResponse.json(
      {
        success: true,
        message: 'Logout successful',
      },
      { status: 200 }
    );

    response.cookies.delete('refreshToken');

    return response;
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Logout failed',
      },
      { status: 500 }
    );
  }
}
