import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

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

    // signIn = async (name, password) => {
    //     try {
    //         const userDetail = await user.findOne({ username: name });
    //         console.log(userDetail.password);
    //         userDetail
    //             .comparePassword(password)
    //             .then((isMatch) => {
    //                 console.log(isMatch);
    //                 return isMatch;
    //                 // Handle the result: isMatch (true/false) indicates password match
    //             })
    //             .catch((error) => {
    //                 console.error('Error comparing passwords:', error);
    //             });
    //     } catch (error) {
    //         console.error('Error adding the user:', error);
    //         process.exit(1); // Exit process on error
    //     }
    // };

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

            // Login successful (user object can be returned here if needed)
            return { success: true, message: 'Login successful' };
        } catch (error) {
            console.error('Error logging in user:', error);
            return { success: false, message: 'Internal server error' }; // Handle generic error
        }
    };
}

export { DataBase };
