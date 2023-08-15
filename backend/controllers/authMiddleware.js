const jwt = require('jsonwebtoken');
const SECRET_KEY = "knsincjjscbjdcjbbbej3e3u8b";

const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        req.user = decoded.user;
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
