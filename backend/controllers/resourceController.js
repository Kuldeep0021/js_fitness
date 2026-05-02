const Resource = require('../models/Resource');
const Member = require('../models/Member');

// @desc    Get all available resources for current user
// @route   GET /api/resources
// @access  Private
const getResources = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const resources = await Resource.find({});
      return res.json({ success: true, data: resources });
    } else {
      const memberProfile = await Member.findOne({ user: req.user._id });
      if (!memberProfile) {
         const err = new Error('Member profile not found');
         err.statusCode = 404;
         return next(err);
      }
      
      // Get resources assigned to this member OR assigned to no one (available to all)
      const resources = await Resource.find({
        $or: [
          { assignedTo: memberProfile._id },
          { assignedTo: { $size: 0 } },
          { assignedTo: { $exists: false } }
        ]
      });
      res.json({ success: true, data: resources });
    }
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

// @desc    Create a resource
// @route   POST /api/resources
// @access  Private/Admin
const createResource = async (req, res, next) => {
  try {
    const { title, description, fileUrl, type, assignedTo } = req.body;
    
    const resource = await Resource.create({
      title,
      description,
      fileUrl,
      type,
      assignedTo: assignedTo || []
    });

    res.status(201).json({ success: true, data: resource });
  } catch (error) {
    error.statusCode = 400;
    return next(error);
  }
};

module.exports = { getResources, createResource };
