if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ejsMate = require('ejs-mate');    // an engine that makes sense of ejs
const Joi = require('joi');
const joiPhoneNumber = Joi.extend(require('joi-phone-number'));
const validateContactForm = require('../utilities/validateContactForm');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const SMTPTransport = require('nodemailer/lib/smtp-transport');
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;


const OAuth2 = google.auth.OAuth2;  // I think I can delete this? try later


router.get('/', async (req, res) => {       // need to make a post route for contact? Not sure where to send it yet...
    res.render('pages/contact');
});

router.post('/', validateContactForm, catchAsync(async (req, res) => {
    // Instantiate the SMTP servier
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }

    })
    // express.json(req.body.message);
    // Specify what the email will look like (mail options)
    const mailOpts = {
        from: req.body.email,
        to: GMAIL_USER,
        subject: 'New message from contact from at RJBBQ.com',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message} Phone number: ${req.body.number}`
    }

    //Attempt to send the email (smtp transport server)
    transporter.sendMail(mailOpts, (error, response) => {
        if (error) {
            console.log(error);
            res.render('pages/contact-failure')
        } else {
            res.render('pages/contact-success')
        }
    })
}));


module.exports = router;