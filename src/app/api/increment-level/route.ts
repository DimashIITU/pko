import { incrementUserLevel } from '@/app/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneNumber } = body;

    if (!phoneNumber) {
      return NextResponse.json({ error: 'phoneNumber is required' }, { status: 400 });
    }

    // Предполагается, что sendNotificationToAllUsers уже реализована
    const results = await incrementUserLevel(phoneNumber);

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to increment level' },
      { status: 500 }
    );
  }
}
