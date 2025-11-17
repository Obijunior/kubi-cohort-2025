const express = require('express');
const router = express.Router();
const mineralController = require('../controllers/mineralController');

// GET all minerals
router.get('/', mineralController.getAllMinerals);

// GET specific mineral data
router.get('/:mineralName', mineralController.getMineralData);

module.exports = router;
