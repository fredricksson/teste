const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
       //check users attributes
    } catch (error) {
        if(!error.statusCode) error.statusCode = 500;
        next(error)
    }
}