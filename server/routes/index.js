const express = require('express');
const router = express.Router();
const resourcesCtrl = require('../controllers/resources');

/* GET home page. */
router.get('/test', (req, res) => {
  return res.status(200).json({ alive: true, date: new Date() })
})

router.get('/connected', (req, res) => {
  return res.status(200).json({ connected: true })
})

router.get('/resources/landing', resourcesCtrl.landingMP4)

module.exports = router;
