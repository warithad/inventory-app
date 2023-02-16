const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    description: {
        type: String,
        maxLength: 100,
    },
    category : [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    price : {
        type: Number,
        min: 0
    },
    numberInStock: {
        type: Number,
        min: 0
    }
});

ItemSchema.virtual('url').get(function () {
    return `/item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);