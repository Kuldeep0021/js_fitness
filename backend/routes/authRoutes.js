const express = require('express');
const router = express.Router();

const { authUser, registerUser, refreshTokenHandler, logoutHandler } = require('../controllers/authController');

router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/refresh', refreshTokenHandler);
router.post('/logout', logoutHandler);

module.exports = router;
