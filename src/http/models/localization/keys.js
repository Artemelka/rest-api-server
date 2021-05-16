import mongoose, { Schema } from 'mongoose';

const KEY_COLLECTION_NAME = 'Key';
const keySchema = new Schema({
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
