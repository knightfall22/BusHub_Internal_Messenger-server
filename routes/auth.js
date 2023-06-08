const express = require('express');
const { postSignIn, postSignUp } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', postSignUp)
router.post('/signin', postSignIn)

module.exports = router;