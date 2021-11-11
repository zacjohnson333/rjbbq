const Joi = require('joi');
const joiPhoneNumber = Joi.extend(require('joi-phone-number'));
const ExpressError = require('./ExpressError');

module.exports = (req, res, next) => {
    const contactSchema = Joi.object({
        // contact: Joi.object({
        name: Joi.string().required(),
        number: joiPhoneNumber.string().phoneNumber().required(),
        email: Joi.string().email().required(),
        message: Joi.string().required()
        // }).required()
    })
    const { error } = contactSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// In the project, we put the schema in it's own file at the top level
// I'm skipping that as this is the only schema we need