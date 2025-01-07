import { NextApiRequest, NextApiResponse } from 'next';
import { sendNotificationToAllUsers } from '../actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const results = await sendNotificationToAllUsers(message);
    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to send notifications' });
  }
}
