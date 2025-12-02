import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db/init';

export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin role
    // Only allow database initialization in development or with admin credentials
    
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          error: 'Database initialization is not allowed in production via API',
        },
        { status: 403 }
      );
    }

    await initializeDatabase();

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initialize database',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
