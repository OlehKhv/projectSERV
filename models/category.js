const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const categorySchema = new Schema(
    {
        categories: [String],
    },
    { versionKey: false, timestamps: true }
);

categorySchema.post('save', handleMongooseError);

const Category = model('category', categorySchema);

module.exports = { Category };
