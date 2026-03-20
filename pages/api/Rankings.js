import dbConnect from '../../lib/mongodb';
import Player from '../../models/Player.js';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Fetches everyone with a tier, including LT5 (2 points)
    const players = await Player.find({ 
      tier: { $exists: true, $ne: "None" } 
    })
    .sort({ points: -1, ign: 1 }) // Sort by points, then alphabetically by name
    .lean();

    res.status(200).json(players);
  } catch (error) {
    console.error("Rankings API Error:", error);
    res.status(500).json({ error: "Failed to fetch rankings" });
  }
}
