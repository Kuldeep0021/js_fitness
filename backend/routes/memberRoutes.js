const express = require('express');
const router = express.Router();
const { createMember, getMembers, updateMember, updateMemberStatus, getMemberProfile } = require('../controllers/memberController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateBody, Joi } = require('../middleware/validateMiddleware');

const createMemberSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('', null),
  membershipTier: Joi.string().valid('1 Month','3 Months','6 Months','1 Year').required(),
  durationMonths: Joi.number().integer().min(1).max(24).required()
});

const updateMemberSchema = Joi.object({
  phone: Joi.string().optional(),
  membershipTier: Joi.string().valid('1 Month','3 Months','6 Months','1 Year').optional(),
  expirationDate: Joi.date().optional()
});

const updateStatusSchema = Joi.object({ status: Joi.string().valid('Active','Inactive').required() });

router.route('/')
  .post(protect, admin, validateBody(createMemberSchema), createMember)
  .get(protect, admin, getMembers);

router.get('/profile', protect, getMemberProfile);

router.route('/:id')
  .put(protect, admin, validateBody(updateMemberSchema), updateMember);

router.patch('/:id/status', protect, admin, validateBody(updateStatusSchema), updateMemberStatus);

module.exports = router;
