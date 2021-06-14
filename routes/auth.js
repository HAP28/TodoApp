const express = require('express')
const router = express.Router();

const authController = require('../controllers/auth-controller');

router.post('/signin',authController.createUser);
router.post('/login',authController.verifyUser);
router.post('/verifytoken',authController.verifytoken);

module.exports = router;