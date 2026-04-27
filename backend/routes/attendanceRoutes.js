const express = require('express');
const router = express.Router();
const { logAttendance, getAttendanceHistory } = require('../controllers/attendanceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, admin, logAttendance);

router.route('/:memberId')
  .get(protect, getAttendanceHistory);

module.exports = router;
