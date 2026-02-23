const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/routes', userController.getRoutes);
router.get('/alerts/emergency', userController.getEmergencyAlerts);
router.get('/temple-info', userController.getTempleInfo);
router.get('/medical', userController.getMedicalInfo);

module.exports = router;
