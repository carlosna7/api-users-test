const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    permission: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    createdAt: String,
});

userSchema.methods.addTask = function (task) {
    this.tasks.push(task)
}

module.exports = model('User', userSchema)