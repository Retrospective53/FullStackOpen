const logger = require('./logger')

const unknownEndPoint = (request, response) => {
    response.status(404).send({error: 'unkown endpoint'})
} 

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    logger.info(error.name)

    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: 'expected `username` to be unique'})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token missing or invalid'})
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired'})
    } else {
        response.status(400).send({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    request.token = request.get('authorization')
    if (request.token && request.token.startsWith('Bearer ')) {
        request.token = request.token.replace('Bearer ', '')
    }
    next()
}

module.exports = {
    unknownEndPoint,
    errorHandler,
    tokenExtractor
}