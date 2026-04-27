const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  type: { type: String, enum: ['Diet Plan', 'Workout Plan', 'Other'], default: 'Other' },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }] // Empty means available to all
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
