const express = require('express');
const router = express.Router();
const ejsMate = require('ejs-mate');

router.get('/', async (req, res) => {
    res.render('pages/contact-failure');
});

module.exports = router;