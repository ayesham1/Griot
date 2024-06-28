const express = require('express');
const { signup, login, protected } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', authMiddleware, protected);

module.exports = router;
