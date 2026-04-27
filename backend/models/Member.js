const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String },
  membershipTier: { type: String, enum: ['1 Month', '3 Months', '6 Months', '1 Year'], required: true },
  joinDate: { type: Date, required: true, default: Date.now },
  expirationDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
