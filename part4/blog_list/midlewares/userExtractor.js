const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {
    try {
        if (!request.headers.authorization) {
            response.status(400).json({ message: "You are not authorized" })
        } else {
            const token = request.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.SECRET)
            request.user = decodedToken
        }
    } catch (e) {
        console.error(e)
        response.status(400).json({ message: "You are not authorized" })
    }
    next()
}

module.exports = userExtractor