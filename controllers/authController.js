// src/controllers/authController.js
const AuthService = require('../services/authService');

class AuthController {
    static async auth(ctx) {
        try {
            const { username, password } = ctx.request.body;

            if (!username || !password) {
                ctx.status = 400;
                ctx.body = { error: 'Missing username or password in the request body' };
                return;
            }

            const authResult = await AuthService.authenticateUser({ username, password });

            if (authResult) {
                ctx.body = authResult;
            } else {
                ctx.status = 401;
                ctx.body = { error: 'Invalid credentials' };
            }
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Internal Server Error' };
        }
    }
}

module.exports = AuthController;
