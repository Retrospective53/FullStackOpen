const logger = require('./logger')

const unknownEndPoint = (request, response) => {
    response.status(404).send({error: 'unkown endpoint'})
} 

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    logger.info(error.name)

    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: 'expected `username` to be unique'})
    } else {
        response.status(400).send({ error: error.message })
    }

    next(error)
}

module.exports = {
    unknownEndPoint,
    errorHandler
}