const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const Item = require('../models/item');



router.get('/', catchAsync(async (req, res, next) => {
    const items = await Item.find({});
    res.render('pages/menu', { items });
}));

module.exports = router;