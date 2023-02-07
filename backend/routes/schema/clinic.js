const mongoose = require('../connect')

const clinicSchema = new mongoose.Schema({

    name: String,
    tel: String,
    tax: String,
    address: String

}, { Collection: 'clinic' })

const Clinic = mongoose.model('Clinic', clinicSchema)

module.exports = Clinic