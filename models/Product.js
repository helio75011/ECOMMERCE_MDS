const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        index: true
    }, 
    title: {
        type: String,
        required: true,
        trim: true
    }, 
    description: {
        type: String,
        trim: true,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }, 
    images: [{
        type: String,
        trim: true
    }],
    category: {
        type: String, 
        trim: true,
        default: 'general'
    },
    stock: {
        type: Number, 
        default: 0,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);