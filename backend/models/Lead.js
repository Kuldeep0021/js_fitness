const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number },
  height: { type: Number }, // in cm
  weight: { type: Number }, // in kg
  gender: { type: String, enum: ['male', 'female', 'other'] },
  bmi: { type: Number },
  calorieEstimate: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
