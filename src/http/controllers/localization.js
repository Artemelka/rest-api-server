import { handleErrorCreator } from '../handlers';
import { KeyModel, LocaleModel } from '../models';

export const LocalizationController = {
    getAllDictionary: (request, response) => {
        LocaleModel.find().then(locales => {
            KeyModel.find().then(keys => {
                response.json(keys.reduce((dictionary = {},{ name, value }) => {
                    const values = JSON.parse(value);

                    locales.forEach(locale => {
                        if (!dictionary[locale.name]) {
                            dictionary[locale.name] = {};
                        }

                        dictionary[locale.name][name] = values[locale.name]
                    });

                    return dictionary;
                }, {}));
            }).catch(handleErrorCreator('error get labels', response, 411))
        }).catch(handleErrorCreator('error get locales', response, 412))
    },
    getLabels: (request, response) => {
        const { activeLocale } = request.query;

        KeyModel.find().then((keys) => {
            response.json(keys.reduce((labels, keyItem) => {
                labels[keyItem.name] = JSON.parse(keyItem.value)[activeLocale];
                return labels;
            }, {}));
        }).catch(handleErrorCreator('error get labels', response, 410));
    },
    getLocales: (request, response) => {
        LocaleModel.find().then(locales => {
            response.json(locales.reduce((acc, locale) => {
                if (locale.enabled) {
                    acc.push(locale.name)
                }

                return acc;
            }, []));
        }).catch(handleErrorCreator('error get locales', response, 410))
    }
};
