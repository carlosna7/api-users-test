const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require("dotenv").config();

const MONGODB = process.env.DB_URL;

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB)
    .then(() => {
        console.log("MongosDB Connection successful")
        return server.listen({ port: 4000 })
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    })