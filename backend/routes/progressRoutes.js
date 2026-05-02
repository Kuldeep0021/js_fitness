const express = require('express');
const router = express.Router();
const { logProgress, getProgressHistory } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');
const { validateBody, Joi } = require('../middleware/validateMiddleware');

const logProgressSchema = Joi.object({
  date: Joi.date().optional(),
  weight: Joi.number().min(20).max(500).required()
});

router.route('/')
  .post(protect, validateBody(logProgressSchema), logProgress);

router.route('/:memberId')
  .get(protect, getProgressHistory);

module.exports = router;
