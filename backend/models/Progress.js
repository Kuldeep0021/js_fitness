const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  date: { type: Date, required: true, default: Date.now },
  weight: { type: Number, required: true } // in kg
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
