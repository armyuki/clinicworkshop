const mongoose = require('../connect')

const medicineSchema = new mongoose.Schema({
    code: String,
    name: String,
    buy: Number,
    sell: Number,
    remark: String

}, { Collection: 'medicine' })

const Medicine = mongoose.model('medicine', medicineSchema)

module.exports = Medicine