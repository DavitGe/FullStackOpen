const tokenExtractor = (request, response, next) => {
    try {
        if (!request.headers.authorization) {
            response.status(400).json({ message: "You are not authorized" })
        } else {
            request.token = request.headers.authorization.split(' ')[1]
        }
    } catch (e) {
        console.error(e)
        response.status(400).json({ message: "You are not authorized" })
    }
    next()
}

module.exports = tokenExtractor