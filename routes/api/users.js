const express = require('express');
const router = express.Router();

const userApi = require('../../controllers/api/user_api');

router.post('/create-session', userApi.createSession);   
router.post('/sign-up', userApi.signUp); 

module.exports = router;