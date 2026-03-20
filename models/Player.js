import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  ign: { type: String, required: true, unique: true },
  tier: { type: String, default: 'LT5' },
  region: { type: String, default: 'NA' },
  points: { type: Number, default: 0 }, // This is your ELO
}, { timestamps: true });

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema);
