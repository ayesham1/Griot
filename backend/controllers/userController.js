const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user._id);
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.protected = (req, res) => {
    res.send('This is a protected route');
};
