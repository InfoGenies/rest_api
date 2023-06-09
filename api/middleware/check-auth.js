
// We protect routes using JSON Web Tokens (JWT) to ensure that only authorized users can 
// access certain resources or perform certain actions within a web application or API 

const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        // here we try to verify our token , the methode verify return decode object
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}