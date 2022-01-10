const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const order = new Schema({
    session: String,
    name: String,
    lastname: String,
    adress: String,
    telephone: Number,
    mail: String,
    comments: String,
    orders: {}
})

module.exports = mongoose.model("Order", order)