import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import user from './models/user.model.js';
import service from './models/service.model.js';
class DataBase {
    constructor(param) {
        this.urlParam = param;
    }
    // connect = async () => {
    //     try {
    //         const conn = await mongoose.connect(`${process.env.DB_URI}/${this.urlParam}`)
    //         console.log(`MongoDB Connected: ${conn.connection.host}`);
    //         console.log(`connected to database: ${this.URL}`);
    //     } catch (error) {
    //         console.error('Error connecting to MongoDB:', error);
    //         process.exit(1); // Exit process on error
    //     }
    // };
    // connectDB = async ()=> {

    // }

    connectToMongoDb = async () => {
        try {
            await mongoose.connect(process.env.DB_URI);
            console.log('Connected to MongoDB cluster');
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
            throw err; // Re-throw the error to allow handling at the calling location
        }

        return {
            getDatabase(databaseName) {
                const db = mongoose.connection.useDb(databaseName);
                console.log(`Connected to MongoDB database: ${db}`);
                return db;
            },
        };
    };

    addUser = async (name, password, database) => {
        // try {
        //     const userInstance = await user({ username: name, password });
        //     userInstance.save({ useDb: database });
        //     return userInstance;
        // } catch (error) {
        //     console.error('Error adding the user:', error);
        //     process.exit(1); // Exit process on error
        // }
        try {
            const db = mongoose.connection.useDb(database);
            console.log(db);
            const userInstance = await user({ username: name, password });
            await userInstance.save({ useDb: db });
            console.log(`User saved successfully in "${database}" database`);
            return userInstance;
        } catch (err) {
            console.error('Error saving user:', err);
            throw err; // Re-throw the error for handling at the calling location
        }
    };

    loginUser = async (email, candidatePassword, database) => {
        try {
            const db = mongoose.connection.useDb(database);
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

    generateApiKey = () => {
        const apiKeyLength = 32; // Adjust as needed
        const apiKeyBytes = crypto.randomBytes(apiKeyLength / 2); // Generate random bytes
        const apiKey = apiKeyBytes.toString('hex').toUpperCase(); // Convert to uppercase hex string

        return apiKey;
    };

    registerService = async (name) => {
        try {
            const serviceModel = await service({
                name,
                apiKey: this.generateApiKey(),
            });
            serviceModel.save();
            return { success: true, message: serviceModel };
        } catch (error) {
            return { success: false, message: error }; // Handle generic error
        }
    };
}

export { DataBase };
