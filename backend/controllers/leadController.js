const Lead = require('../models/Lead');
const axios = require('axios');

// @desc    Create a lead (from BMI calculator)
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res, next) => {
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

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    error.statusCode = 400;
    return next(error);
  }
};

module.exports = { createLead };
