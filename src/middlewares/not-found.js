const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({ message: `requsted url: ${req.method} ${req.url} was not found on this server` })
}

module.exports = notFoundMiddleware