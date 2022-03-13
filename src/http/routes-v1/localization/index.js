import express from 'express';
import { LocalizationController } from '../../controllers/index.js';

export const localization = express.Router();

localization.get('/labels', LocalizationController.getLabels);

localization.get('/locales', LocalizationController.getLocales);

localization.get('/dictionary', LocalizationController.getAllDictionary);
