import { sendNotificationToAllUsers } from '@/app/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, url, imgUrl } = body;

    if (!message || !url || !imgUrl) {
      return NextResponse.json({ error: 'Message, url, imgUrl is required' }, { status: 400 });
    }

    // Предполагается, что sendNotificationToAllUsers уже реализована
    const results = await sendNotificationToAllUsers(message, url, imgUrl);

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send notifications' },
      { status: 500 }
    );
  }
}
