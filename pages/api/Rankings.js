import dbConnect from '../../lib/mongodb';
import Player from '../../models/Player.js';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Fetches everyone with a tier, sorted by points
    const players = await Player.find({ 
      tier: { $ne: "None" } 
    }).sort({ points: -1 }).lean();

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rankings" });
  }
}
