const express = require('express');
const router = express.Router();
const { createLead } = require('../controllers/leadController');
const { validateBody, Joi } = require('../middleware/validateMiddleware');

const leadSchema = Joi.object({
	name: Joi.string().min(2).max(100).required(),
	email: Joi.string().email().required(),
	age: Joi.number().min(1).max(120).optional(),
	height: Joi.number().min(50).max(300).optional(),
	weight: Joi.number().min(20).max(500).optional(),
	gender: Joi.string().valid('male','female','other').optional(),
	bmi: Joi.number().optional(),
	calorieEstimate: Joi.number().optional()
});

router.post('/', validateBody(leadSchema), createLead);

module.exports = router;
