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
const designation = Joi.string()
    .min(1);
const phone = Joi.number().integer();
const address = Joi.string()
    .min(1);
const name = Joi.string()
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
        password: password.required(),
    }
});

const validateMemberRegistration = validate({
    body: {
        fullname: fullname.required(),
        email: email.required(),
        designation: designation.required(),
        phone: phone.required(),
    }
});

const validateConvertRegistration = validate({
    body: {
        name: name.required(),
        email: email.required(),
        address: address.required(),
        phone: phone.required(),
    }
});


export {
    validateSignup,
    validateLogin,
    validateMemberRegistration,
    validateConvertRegistration
};