const logger = require('./logger')

const unknownEndPoint = (request, response) => {
    response.status(404).send({error: 'unkown endpoint'})
} 

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    response.status(400).send('Bad Request omegalul')

    next(error)
}

module.exports = {
    unknownEndPoint,
    errorHandler
}