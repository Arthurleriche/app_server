const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function( req, res, next) {
    // get token from the header
    const token = req.header('x-auth-token');

    // check if not token
    if(!token){
        res.status(401).json({msg: 'no token autorization'})
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwt'))
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({msg: 'token is not valid'})
    }
}