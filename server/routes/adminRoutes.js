const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/zones', adminController.getZones);
router.get('/zones/:id', adminController.getZoneById);
router.post('/zones/:id/update', adminController.updateZoneCrowdLevel);
router.get('/alerts', adminController.getAlerts);

module.exports = router;
