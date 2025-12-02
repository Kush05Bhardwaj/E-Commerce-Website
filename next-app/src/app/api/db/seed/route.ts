import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/db/seed';

export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin role
    // Only allow database seeding in development or with admin credentials
    
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          error: 'Database seeding is not allowed in production via API',
        },
        { status: 403 }
      );
    }

    await seedDatabase();

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
