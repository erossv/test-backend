// src/middleware/auth.js
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function generateToken(user) {
    const payload = { id: user.id, username: user.username };
    const options = { expiresIn: '2h' };
    return jwt.sign(payload, secret, options);
}

async function authenticateJWT(ctx, next) {
    const path = ctx.path;
    const needAuthentication = !path.includes('/auth');
    const token = ctx.header.authorization;

    try {
        if (needAuthentication && !token) {
            ctx.status = 401;
            ctx.body = 'Unauthorized';
        } else if (needAuthentication && token) {
            const decoded = jwt.verify(token, secret);
            ctx.state.user = decoded;
        }
        await next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            ctx.status = 401;
            ctx.body = 'Token expired';
        } else {
            ctx.status = 403;
            ctx.body = 'Forbidden';
        }
    }
}

module.exports = { generateToken, authenticateJWT };

