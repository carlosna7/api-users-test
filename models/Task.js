const { model, Schema } = require('mongoose')

const taskSchema = new Schema({
    id: String,
    name: String,
    responsible: String,
    createdAt: String,
})

module.exports = model('Task', taskSchema)