const jwt = require('jsonwebtoken');
const SECRET_KEY = "knsincjjscbjdcjbbbej3e3u8b";

const isAuthenticated = (req, res, next) => {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    const token = authorizationHeader.slice(7); // Remove 'Bearer ' prefix
  
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded?.userId;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        } else {
            res.status(401).json({ error: 'Token is not valid' });
        }
    }
};

module.exports = isAuthenticated;
