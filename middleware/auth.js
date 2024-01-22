const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')

module.exports = (context) => {

    const authHeader = context.req.headers.authorization
    console.log(authHeader)

    if(authHeader) {
        const token = authHeader.split('Bearer')[1]

        if(token) {
            try {
                const user = jwt.verify(token, "token-jwt-carlosna7")

                return user

            } catch (error) {
                throw new AuthenticationError('invalid/Expired Token')
            }
        }
        throw new Error("Authentication token must be 'Bearer [token]")
    }
    throw new Error("Authentication header must be provided")
}