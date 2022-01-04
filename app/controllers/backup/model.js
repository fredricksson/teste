
//New controller
module.exports.register = async (req, res, next) => {
    try {
        //avoid using ().then and .catch() ::: Instead, use await whenever possible
        
    } catch (error) {
        //This is forwarded to the global error handler. Do not change it.
        if(!error.statusCode) error.statusCode = 500
        next(error)         
    }
}

