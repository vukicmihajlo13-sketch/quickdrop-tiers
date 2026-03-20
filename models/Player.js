import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  ign: { type: String, required: true },
  discordId: { type: String, required: true, unique: true },
  tier: { type: String, required: true },
  region: { type: String, required: true },
  avatar: { type: String },
  // Crucial: Default to 0 so they don't show up on the site automatically
  points: { type: Number, default: 0 }, 
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema);
