import mongoose from 'mongoose';

const KEY_COLLECTION_NAME = 'Key';
const keySchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    value: {
        required: true,
        type: String,
        unique: true
    }
});

export const KeyModel = mongoose.model(KEY_COLLECTION_NAME, keySchema);
