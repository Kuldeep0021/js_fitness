const express = require('express');
const router = express.Router();
const { logAttendance, getAttendanceHistory } = require('../controllers/attendanceController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateBody, Joi } = require('../middleware/validateMiddleware');

const logAttendanceSchema = Joi.object({
  memberId: Joi.string().required(),
  date: Joi.date().required(),
  timeIn: Joi.string().required(),
  timeOut: Joi.string().allow('', null)
});

router.route('/')
  .post(protect, admin, validateBody(logAttendanceSchema), logAttendance);

router.route('/:memberId')
  .get(protect, getAttendanceHistory);

module.exports = router;
