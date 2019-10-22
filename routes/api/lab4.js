const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Post model
// const Post = require('../../models/Post');
// Profile model
// const Profile = require('../../models/Profile');

// Validation add validation for input on LAB4
// if needed ????
// const validatePostInput = require('../../validation/post');

// @route   GET api/lab4/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'lab4 Works' }));

module.exports = router;
