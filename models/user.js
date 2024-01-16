const { Schema, model } = require('mongoose');
const Joi = require('joi');

const handleMongooseError = require('../helpers/handleMongooseError');

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: emailPattern,
            unique: true,
        },
        password: {
            type: String,
            minLength: 6,
            required: [true, 'Password is required'],
        },
        token: {
            type: String,
            default: null,
        },
        height: {
            type: Number,

            default: null,
        },
        currentWeight: {
            type: Number,

            default: null,
        },
        desiredWeight: {
            type: Number,

            default: null,
        },
        birthday: {
            type: Date,
            default: null,
        },
        blood: {
            type: Number,

            default: null,
        },
        sex: {
            type: String,

            default: null,
        },
        levelActivity: {
            type: Number,

            default: null,
        },
        dailySportTime: {
            type: Number,
            default: 110,
        },
        dailyCalories: {
            type: Number,
            default: 0,
        },
        avatarURL: {
            type: String,
            default:
                'https://res.cloudinary.com/doiiko7sq/image/upload/v1705323621/default-avatar/default_dmhmqw.jpg',
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().pattern(emailPattern).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().pattern(emailPattern).required(),
    password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().pattern(emailPattern),
    height: Joi.number().min(150).required(),
    currentWeight: Joi.number().min(35).required(),
    desiredWeight: Joi.number().min(35).required(),
    birthday: Joi.date()
        .max('now')
        .required()
        .custom(value => {
            const now = new Date();
            const age = now.getFullYear() - new Date(value).getFullYear();
            if (age < 18) {
                throw new Error('User must be at least 18 years old.');
            }
            return value;
        }),
    blood: Joi.number().required().valid(1, 2, 3, 4),
    sex: Joi.string().required().valid('male', 'female'),
    levelActivity: Joi.number().required().valid(1, 2, 3, 4, 5),
});

const User = model('user', userSchema);
module.exports = { User, registerSchema, loginSchema, updateSchema };
