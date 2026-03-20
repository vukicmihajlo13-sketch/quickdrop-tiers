import connectDB from '../../lib/mongodb';
import Player from '../../models/Player';

export default async function handler(req, res) {
  await connectDB();
  try {
    const players = await Player.find({}).sort({ points: -1 });
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
}
