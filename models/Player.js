import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  username: String,
  discordId: String,
  tier: { type: String, default: 'Unranked' },
  avatar: String,
  points: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema);
