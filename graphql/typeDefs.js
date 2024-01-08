const { gql } = require('apollo-server');

module.exports = gql`

    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        permission: String!
        tasks: [Task]
        createdAt: String!
    }

    type Task {
        id: ID!
        name: String!
        responsible: String!
        createdAt: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
        permission: String!
    }

    input LoginInput {
        name: String
        email: String!
        password: String!
        permission: String
    }

    input TaskInput {
        name: String!
        responsible: String!
    }

    type Query {
        user(id: ID!): User!
        getUsers(amount: Int): [User]
        task(id: ID!): Task!
        getTasks(amount: Int): [Task]
    }

    type Mutation {
        signIn(loginInput: LoginInput): User!
        signUp(userInput: UserInput): User!
        createTask(taskInput: TaskInput): Task!
    }
`