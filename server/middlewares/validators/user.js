import Joi from 'joi';
import validate from 'express-validation';

const fullname = Joi.string()
    .min(1);
const email = Joi.string()
    .min(1)
    .email();
const username = Joi.string()
    .min(1);
const password = Joi.string()
    .min(1);


const validateSignup = validate({
    body: {
        fullname: fullname.required(),
        email: email.required(),
        username: username.required(),
        password: password.required(),
    }
});

const validateLogin = validate({
    body: {
        username: username.required(),
        password: password.required()
    }
});


export {
    validateSignup,
    validateLogin
};