const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    id: String,
    name: String,
    email: {type: String, unique: true},
    password: String,
    permission: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    token: String,
});

userSchema.methods.addTask = function (task) {
    this.tasks.push(task)
}

module.exports = model('User', userSchema)