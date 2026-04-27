const Attendance = require('../models/Attendance');
const Member = require('../models/Member');

// @desc    Log attendance
// @route   POST /api/attendance
// @access  Private/Admin
const logAttendance = async (req, res) => {
  try {
    const { memberId, date, timeIn, timeOut } = req.body;
    
    // verify member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const attendance = await Attendance.create({
      member: memberId,
      date,
      timeIn,
      timeOut
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get attendance history for a member
// @route   GET /api/attendance/:memberId
// @access  Private
const getAttendanceHistory = async (req, res) => {
  try {
    // If user is a member, they can only see their own attendance
    if (req.user.role === 'member') {
      const memberProfile = await Member.findOne({ user: req.user._id });
      if (memberProfile._id.toString() !== req.params.memberId) {
        return res.status(403).json({ message: 'Not authorized to view this data' });
      }
    }

    const attendance = await Attendance.find({ member: req.params.memberId }).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { logAttendance, getAttendanceHistory };
