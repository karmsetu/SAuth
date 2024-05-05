import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
});

export const image = mongoose.model('Image', imageSchema);
