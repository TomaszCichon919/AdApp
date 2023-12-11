const express = require('express');
const router = express.Router();
const authMiddleware = require('../utlis/authMiddleware');
const iamgeUpload = require('../utlis/imageUpload');


const AdController = require('../controllers/ads.controller');

router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getById);
router.post('/ads', authMiddleware, iamgeUpload.single('photo'), AdController.addNew);
router.put('/ads/:id', authMiddleware, iamgeUpload.single('photo'), AdController.edit);
router.delete('/ads/:id', authMiddleware, AdController.delete);
router.get('/ads/search/:searchPhrase', AdController.searchAds);

module.exports = router;