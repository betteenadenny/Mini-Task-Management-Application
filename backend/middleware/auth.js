require('dotenv').config();

const jwt = require('jsonwebtoken');
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Invalid token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(req.user);
        next()
        
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
        
    }
  
}

module.exports = authenticate;