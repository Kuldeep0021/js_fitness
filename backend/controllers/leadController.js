const Lead = require('../models/Lead');
const axios = require('axios');

// @desc    Create a lead (from BMI calculator)
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
  try {
    const { name, email, age, height, weight, gender, bmi, calorieEstimate } = req.body;
    
    const lead = await Lead.create({
      name, email, age, height, weight, gender, bmi, calorieEstimate
    });

    // Trigger n8n webhook
    try {
      await axios.post(process.env.N8N_WEBHOOK_TRIAL_PASS, {
        name,
        email,
        bmi,
        calorie_estimate: calorieEstimate,
        timestamp: new Date().toISOString()
      });
    } catch (webhookError) {
      console.error('Failed to trigger n8n webhook for lead:', webhookError.message);
      // We don't fail the request if webhook fails, just log it
    }

    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createLead };
