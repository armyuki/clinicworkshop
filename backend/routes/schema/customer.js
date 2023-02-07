const mongoose = require('../connect')

const CustomerSchema = new mongoose.Schema({
    code: String,
    name: String,
    email: String,
    address: String,
    tel: String,
    lineid: String

}, { Collection : 'customer' })

const Customer = mongoose.model('customer', CustomerSchema)

module.exports = Customer