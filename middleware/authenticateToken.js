/**
 * Projektarbete DT207G
 * Skapad av: Ramona Reinholdz, rare2400
 */

const jwt = require("jsonwebtoken");


//validate token
function authenticateToken(req, res, next) {

    /* fetch token from header (Authorization: Bearer 'token') 
    then remove the space and get only the token */
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    //deny access if theres no token
    if (token == 0) return res.status(401).json({ error: "No token provided" });

    //verify token with secret JWT-key from the .dotenv-file
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        
        //access denied if the verification failed
        if (err) return res.status(403).json({ error: "Invalid token" });

        //save username in req and move to the next function if verification succeed
        req.username = username;
        next();
    });
}

module.exports = authenticateToken;