var jwt = require('jsonwebtoken');
var JWT_SECRET = 'Shera@code@krega';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');

    // If token is not present in header
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

    // If token present in header
    try {
        const data = jwt.verify(token, JWT_SECRET); // verify token with our secret key
        req.user = data.user;

        next()
    } 
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

}


module.exports = fetchuser;