import dbConnect from '../../lib/mongodb';
import Player from '../../models/Player.js';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // DEBUG STEP 1: Log every single document in the collection to your terminal
    const allData = await Player.find({}).lean();
    console.log("DATABASE CHECK - Found count:", allData.length);
    console.log("FIRST PLAYER DATA:", allData[0]);

    // DEBUG STEP 2: Your actual filtered query
    const players = await Player.find({ 
      tier: { $exists: true, $ne: "None" } 
    }).sort({ points: -1 }).lean();

    res.status(200).json(players);
  } catch (error) {
    console.error("MONGODB ERROR:", error);
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
}
