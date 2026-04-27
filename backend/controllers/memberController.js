const Member = require('../models/Member');
const User = require('../models/User');
const axios = require('axios');
const crypto = require('crypto');

// @desc    Create a new member
// @route   POST /api/members
// @access  Private/Admin
const createMember = async (req, res) => {
  try {
    const { name, email, phone, membershipTier, durationMonths } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    
    // If not, create a new User account for the member
    if (!user) {
      // Generate a random password for initial setup
      const randomPassword = crypto.randomBytes(8).toString('hex');
      user = await User.create({
        name,
        email,
        password: randomPassword,
        role: 'member'
      });
    }

    const joinDate = new Date();
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + parseInt(durationMonths));

    const member = await Member.create({
      user: user._id,
      phone,
      membershipTier,
      joinDate,
      expirationDate,
      status: 'Active'
    });

    // Trigger n8n webhook
    try {
      await axios.post(process.env.N8N_WEBHOOK_WELCOME_PACKET, {
        name,
        email,
        membership_tier: membershipTier,
        join_date: joinDate.toISOString(),
        timestamp: new Date().toISOString()
      });
    } catch (webhookError) {
      console.error('Failed to trigger n8n webhook for member:', webhookError.message);
    }

    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all members
// @route   GET /api/members
// @access  Private/Admin
const getMembers = async (req, res) => {
  try {
    const members = await Member.find({}).populate('user', 'name email');
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a member
// @route   PUT /api/members/:id
// @access  Private/Admin
const updateMember = async (req, res) => {
  try {
    const { phone, membershipTier, expirationDate } = req.body;
    
    const member = await Member.findById(req.params.id);
    if (member) {
      member.phone = phone || member.phone;
      member.membershipTier = membershipTier || member.membershipTier;
      if (expirationDate) member.expirationDate = expirationDate;
      
      const updatedMember = await member.save();
      res.json(updatedMember);
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update member status
// @route   PATCH /api/members/:id/status
// @access  Private/Admin
const updateMemberStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Active' or 'Inactive'
    
    const member = await Member.findById(req.params.id);
    if (member) {
      member.status = status;
      const updatedMember = await member.save();
      res.json(updatedMember);
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get current member profile
// @route   GET /api/members/profile
// @access  Private
const getMemberProfile = async (req, res) => {
  try {
    const member = await Member.findOne({ user: req.user._id }).populate('user', 'name email');
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ message: 'Member profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMember, getMembers, updateMember, updateMemberStatus, getMemberProfile };
