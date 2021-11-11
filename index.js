if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');    // an engine that makes sense of ejs
const bodyParser = require('body-parser');
const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError');
const Item = require('./models/item');
const menu = require('./routes/menu');
const home = require('./routes/home');
const catering = require('./routes/catering');
const story = require('./routes/story');
const next = require('./routes/next');
const contact = require('./routes/contact');
const contactSuccess = require('./routes/contact-success');
const contactFailure = require('./routes/contact-failure');
const sanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/rj-bbq'


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});



const app = express();



app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))          // do I even need body parser package?  I think so? but it is depreicated
app.use(express.json());
app.use(sanitize({
    replaceWith: '_'
}));
app.use(helmet({ contentSecurityPolicy: false }));  // did not follow the video completely cause it was jacking stuff up

// app.use((req, res, next) => {
//     console.log(req.query);
//     next();
// })



app.use('/', home);
app.use('/menu', menu);
app.use('/catering', catering);
app.use('/story', story);
app.use('/next', next);
app.use('/contact', contact);
app.use('/contact-success', contactSuccess);
app.use('/contact-failure', contactFailure);


app.all('*', (req, res, next) => {                  // remember, since we are passing someting to next(), it will hit our basic error handler
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {          // basic error handler
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!';
    res.status(statusCode).render('error', { err });
})


const port = process.env.PORT || 3000;    // automatically set on Heroku, usually 80
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});