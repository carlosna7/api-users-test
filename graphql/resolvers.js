const User = require('../models/User')
const Task = require('../models/Task')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

module.exports = {
    Query: {
        async user(_, {ID}) {
            return await User.findById(ID)
        },
        async getUsers(_, {amount}) {
            return await User.find().sort({ createdAt: -1 }).limit(amount)
        },
        async task(_, {ID}) {
            return await Task.findById(ID)
        },
        async getTasks(_, {amount}) {
            return await Task.find().sort({ createdAt: -1 }).limit(amount)
        },
    },
    Mutation: {

        async signUp(_, {userInput: {name, email, password, permission}}) {
            try {

                const oldUser = await User.findOne({ email })

                if(oldUser) {
                    throw new Error("User already exists.")
                }

                const hashPassword = await bcrypt.hash(password, 10)

                const createdUser = new User({
                    id: parseInt(Math.random() * 1000000000000),
                    name: name,
                    email: email.toLowerCase(),
                    password: hashPassword,
                    permission: permission
                })

                const token = jwt.sign(
                    {
                        id: createdUser._id,
                        name: createdUser.name,
                    },
                    'token-jwt-carlosna7', 
                    {
                        expiresIn: '1h',
                    }
                )

                createdUser.token = token
    
                const res = await createdUser.save() // Save on mongoDB
                
                // console.log(createdUser._id)
                // console.log(createdUser.id)

                return {
                    id: res.id,
                    ...res._doc
                }
            } catch (error) {
                throw new Error("Ocorreu um erro ao criar o usuário.")
            }
        },

        async signIn(_, {loginInput: {email, password}}) {
            try {

                const user = await User.findOne({ email })

                console.log(user._id)

                if(!user) {
                    throw new Error("Usuário não encontrado.")
                } else {
                    console.log("email correto")
                }
                
                if(user && (await bcrypt.compare(password, user.password))) { 
                    console.log("senha correta")

                    const token = jwt.sign(
                        {
                            id: user._id,
                            name: user.name,
                        },
                        'token-jwt-carlosna7', 
                        {
                            expiresIn: '1h',
                        }
                    )

                    user.token = token

                    const res = await user.save() // Save on mongoDB

                    return {
                        id: res.id,
                        ...res._doc
                    }

                } else {
                    throw new Error("Secha incorreta.")
                }

            } catch (error) {
                throw new Error("Ocorreu um erro ao realizar o login.")
            }
        },

        async createTask(_, {taskInput: {name, responsible}}) {
            try {

                const createdTask = new Task({
                    id: parseInt(Math.random() * 1000000000000),
                    name: name,
                    responsible: responsible,
                    createdAt: new Date().toISOString()
                })

                console.log("teste log")

                const res = await createdTask.save() // Save on mongoDB

                const user = await User.findById("207228")
                // const user2 = await User.findById({ id })

                if (!user) {
                    throw new Error('Usuário não encontrado!')
                }

                user.tasks.push(createdTask)
                await user.save() // Save the changes on mongoDB user.

                return {
                    id: res.id,
                    ...res._doc,
                }

            } catch (error) {
                // console.error("Erro durante a criação da tarefa:", error)
                throw new Error("Ocorreu um erro ao criar a tarefa.")
            }

        }
    }
}