// src/routes/authRoute.js
const AuthController = require('../controllers/authController');

function addAuthRoute(router) {
    router.post('/auth', AuthController.auth);
}

module.exports = addAuthRoute;

