import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { authService } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Refresh token not found',
        },
        { status: 401 }
      );
    }

    const payload = authService.verifyRefreshToken(refreshToken);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid refresh token',
        },
        { status: 401 }
      );
    }

    const user = await authService.getUserById(payload.userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    // Remove old refresh token and generate new ones
    await authService.removeRefreshToken(user._id.toString(), refreshToken);

    const newAccessToken = authService.generateAccessToken(user);
    const newRefreshToken = authService.generateRefreshToken(user);

    await authService.saveRefreshToken(user._id.toString(), newRefreshToken);

    const response = NextResponse.json(
      {
        success: true,
        accessToken: newAccessToken,
      },
      { status: 200 }
    );

    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Token refresh failed',
      },
      { status: 401 }
    );
  }
}
