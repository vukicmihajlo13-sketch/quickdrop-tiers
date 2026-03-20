import dbConnect from '../../lib/mongodb';
import mongoose from 'mongoose';

// Define the Queue schema if not already in a models file
const QueueSchema = new mongoose.Schema({
  ign: String,
  discordId: String,
  createdAt: { type: Date, default: Date.now }
});

const Queue = mongoose.models.Queue || mongoose.model('Queue', QueueSchema);

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Fetches everyone in the queue, oldest first
    const currentQueue = await Queue.find({}).sort({ createdAt: 1 }).lean();
    res.status(200).json(currentQueue);
  } catch (error) {
    res.status(500).json({ error: "Failed to load queue" });
  }
}
