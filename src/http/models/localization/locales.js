import mongoose, { Schema } from 'mongoose';

const LOCALE_COLLECTION_NAME = 'Locale';
const localesSchema = new Schema({
    enabled: Boolean,
    name: {
        required: true,
        type: String,
        unique: true
    }
});

export const LocaleModel = mongoose.model(LOCALE_COLLECTION_NAME, localesSchema);
