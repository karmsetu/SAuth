import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // For API key encryption (optional)

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a service name'],
            unique: true,
            trim: true,
        },
        apiKey: {
            type: String,
            required: [true, 'Please provide an API key'],
            unique: true,
            minlength: [32, 'API key must be at least 32 characters long'], // Adjust as needed
        },
        // Consider using a stronger hashing algorithm for API keys in production
        apiKeyHash: {
            // Optional if using bcrypt for encryption
            type: String,
        },
        // Add other service properties here (e.g., description, owner, etc.)
    },
    { timestamps: true }
); // Include timestamps automatically

// Hash API key before saving the service (optional)
serviceSchema.pre('save', async function (next) {
    if (!this.isModified('apiKey')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.apiKeyHash = await bcrypt.hash(this.apiKey, salt);
    next();
});

// Function to compare provided API key with hashed key (optional)
serviceSchema.methods.compareApiKey = async function (candidateApiKey) {
    return await bcrypt.compare(candidateApiKey, this.apiKeyHash);
};

export default mongoose.model('Service', serviceSchema);
