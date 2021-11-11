if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const items = require('./items');
const Item = require('../models/item');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/rj-bbq';



mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDB = async () => {
    await Item.deleteMany({});
    for (let i = 0; i < items.length; i++) {
        const item = new Item({
            name: `${items[i].name}`,
            price: `${items[i].price}`,
            description: `${items[i].description}`,
            img: `${items[i].img}`
        })
        await item.save();
    }
}

seedDB().then(() => {   // can use .then as it is an async fxn
    console.log('Seeded');
    mongoose.connection.close();
    console.log('Database disconnected');
});