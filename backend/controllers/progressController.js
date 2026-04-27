const Progress = require('../models/Progress');
const Member = require('../models/Member');

// @desc    Log weight progress
// @route   POST /api/progress
// @access  Private (Member)
const logProgress = async (req, res) => {
  try {
    const { date, weight } = req.body;
    
    const member = await Member.findOne({ user: req.user._id });
    if (!member) {
      return res.status(404).json({ message: 'Member profile not found' });
    }

    const progress = await Progress.create({
      member: member._id,
      date: date || new Date(),
      weight
    });

    res.status(201).json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get progress history
// @route   GET /api/progress/:memberId
// @access  Private
const getProgressHistory = async (req, res) => {
  try {
    if (req.user.role === 'member') {
      const memberProfile = await Member.findOne({ user: req.user._id });
      if (memberProfile._id.toString() !== req.params.memberId) {
        return res.status(403).json({ message: 'Not authorized to view this data' });
      }
    }

    const progress = await Progress.find({ member: req.params.memberId }).sort({ date: 1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { logProgress, getProgressHistory };
