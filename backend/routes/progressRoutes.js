const express = require('express');
const router = express.Router();
const { logProgress, getProgressHistory } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, logProgress);

router.route('/:memberId')
  .get(protect, getProgressHistory);

module.exports = router;
