const mongoose = require('../connect')

const healthSchema = new mongoose.Schema({

    pet_id: mongoose.Schema.Types.ObjectId,
    problem: String,
    price: Number,
    remark: String,
    created_at: { type: Date, default: Date.now() }

}, { Collection: 'health' })

const Health = mongoose.model('health', healthSchema)

module.exports = Health