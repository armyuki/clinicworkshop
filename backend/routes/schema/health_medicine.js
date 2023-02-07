const { Double, Int32 } = require('mongodb')
const mongoose = require('../connect')

const health_medicineSchema = new mongoose.Schema({

    medicine_id: mongoose.Schema.Types.ObjectId,
    health_id: mongoose.Schema.Types.ObjectId,
    qty:Number,
    remark:String

}, { Collection: 'health_medicine' })

const Health_medicine = mongoose.model('health_medicine', health_medicineSchema)

module.exports = Health_medicine