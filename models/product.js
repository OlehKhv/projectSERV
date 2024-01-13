const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const productSchema = new Schema(
    {
        weight: {
            type: Number,
            required: true,
        },
        calories: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        groupBloodNotAllowed: {
            1: { type: Boolean, required: true },
            2: { type: Boolean, required: true },
            3: { type: Boolean, required: true },
            4: { type: Boolean, required: true },
        },
    },
    { versionKey: false, timestamps: true }
);

productSchema.post('save', handleMongooseError);

const Product = model('product', productSchema);

module.exports = { Product };
