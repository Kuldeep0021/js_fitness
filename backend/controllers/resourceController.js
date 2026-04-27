const Resource = require('../models/Resource');
const Member = require('../models/Member');

// @desc    Get all available resources for current user
// @route   GET /api/resources
// @access  Private
const getResources = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const resources = await Resource.find({});
      return res.json(resources);
    } else {
      const memberProfile = await Member.findOne({ user: req.user._id });
      if (!memberProfile) {
         return res.status(404).json({ message: 'Member profile not found' });
      }
      
      // Get resources assigned to this member OR assigned to no one (available to all)
      const resources = await Resource.find({
        $or: [
          { assignedTo: memberProfile._id },
          { assignedTo: { $size: 0 } },
          { assignedTo: { $exists: false } }
        ]
      });
      res.json(resources);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a resource
// @route   POST /api/resources
// @access  Private/Admin
const createResource = async (req, res) => {
  try {
    const { title, description, fileUrl, type, assignedTo } = req.body;
    
    const resource = await Resource.create({
      title,
      description,
      fileUrl,
      type,
      assignedTo: assignedTo || []
    });

    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getResources, createResource };
