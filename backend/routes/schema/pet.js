const mongoose = require('../connect')

const petSchema = new mongoose.Schema({
    customer_id: mongoose.Schema.Types.ObjectId,
    code: String,
    name: String,
    remark: String

}, { Collection : 'pet' })

const Pet = mongoose.model('pet', petSchema)

module.exports = Pet