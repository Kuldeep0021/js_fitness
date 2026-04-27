const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  date: { type: Date, required: true },
  timeIn: { type: String, required: true },
  timeOut: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
