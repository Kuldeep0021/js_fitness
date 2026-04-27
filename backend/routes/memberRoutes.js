const express = require('express');
const router = express.Router();
const { createMember, getMembers, updateMember, updateMemberStatus, getMemberProfile } = require('../controllers/memberController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, admin, createMember)
  .get(protect, admin, getMembers);

router.get('/profile', protect, getMemberProfile);

router.route('/:id')
  .put(protect, admin, updateMember);

router.patch('/:id/status', protect, admin, updateMemberStatus);

module.exports = router;
