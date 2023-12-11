const express = require('express');
const router = express.Router();
const authMiddleware = require('../utlis/authMiddleware');
const iamgeUpload = require('../utlis/imageUpload');

const auth = require('../controllers/auth.controller');

router.post('/register', iamgeUpload.single('avatar'), auth.register);
router.post('/login', auth.login);
router.get('/user', authMiddleware, auth.getUser);
router.post('/logout', authMiddleware, auth.logout);

module.exports = router;