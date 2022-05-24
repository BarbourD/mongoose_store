const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, requered: true },
    img: {type: String },
    price: {type: Number },
    qty: {type: Number },
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;