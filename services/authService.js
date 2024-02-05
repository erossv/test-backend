// src/services/authService.js
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/auth');

class AuthService {
    static async authenticateUser({ username, password }) {
        try {
            let user = await UserModel.getUserByUsername(username);
            if (!user) {
                user = await this.createUser(username, password);
            }

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                return { username: user.username, token };
            }
        } catch (error) {
            console.error(`Error in authenticateUser: ${error.message}`);
            throw new Error('Authentication failed');
        }

        return null;
    }

    static async createUser(username, password) {
        try {
            const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
            const salt = bcrypt.genSaltSync(saltRounds);
            const passwordHash = bcrypt.hashSync(password, salt);

            const savedUser = await UserModel.save({ username, password: passwordHash, salt });
            return savedUser;
        } catch (error) {
            console.error(`Error in createUser: ${error.message}`);
            throw new Error('User creation failed');
        }
    }
}

module.exports = AuthService;
