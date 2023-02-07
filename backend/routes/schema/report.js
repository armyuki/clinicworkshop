const mongoose = require('../connect')

const reportSchema = new mongoose.Schema({
    customer_id: mongoose.Schema.Types.ObjectId,
    code: String,
    name: String,
    remark: String

}, { Collection : 'report' })

const Report = mongoose.model('report', reportSchema)

module.exports = Report