import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

import user from './models/user.model.js';
class DataBase {
    constructor(URL) {
        this.URL = `${process.env.DB_URI}/${URL}`;
    }

    connectDB = async () => {
        try {
            const conn = await mongoose.connect(this.URL);

            console.log(`MongoDB Connected: ${conn.connection.host}`);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1); // Exit process on error
        }
    };

    addUser = async (name, password) => {
        try {
            const userInstance = await user({ username: name, password });
            userInstance.save();
            return userInstance;
        } catch (error) {
            console.error('Error adding the user:', error);
            process.exit(1); // Exit process on error
        }
    };

    loginUser = async (email, candidatePassword) => {
        try {
            const userModel = await user.findOne({ email }); // Find user by email
            if (!userModel) {
                return { success: false, message: 'Invalid email or password' }; // User not found
            }

            const isMatch = await userModel.comparePassword(candidatePassword); // Compare passwords
            if (!isMatch) {
                return { success: false, message: 'Invalid email or password' }; // Password mismatch
            }

            // Login successful, generate JWT token
            const payload = {
                _id: userModel._id,
                name: userModel.username || '',
            }; // Include name if available
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '3600s',
            }); // Expires in 1 hour
            //  Login successful (user object can be returned here if needed)
            return { success: true, message: 'Login successful', token };
        } catch (error) {
            console.error('Error logging in user:', error);
            return { success: false, message: 'Internal server error' }; // Handle generic error
        }
    };
}

export { DataBase };
