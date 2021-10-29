const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({ // likely to change
    name: String,
    price: Number,
    img: String,
    meat: String,
    size: String,
    description: String
});

module.exports = mongoose.model('Item', ItemSchema);