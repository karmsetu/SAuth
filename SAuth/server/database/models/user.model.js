// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // For password hashing (optional)
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    password: {
        // Optional if using social login or JWT
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    age: {
        type: Number,
        min: 13, // Adjust minimum age requirement as needed
        max: 120, // Adjust maximum age requirement as needed
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'other'], // Add or remove options as needed
    },
    // Add other user properties if needed (e.g., name, profile picture, etc.)
});

// Hash password before saving the user (optional)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare hashed password with provided password during login (optional)
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
