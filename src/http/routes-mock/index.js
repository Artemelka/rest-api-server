import express from 'express';
import fetch from 'cross-fetch';

const BASE_URL = 'https://manifity-coins-default-rtdb.firebaseio.com';

const dataCache = {};

const fetchWrapper = async (url) => {
    try {
        const response = await fetch(`${BASE_URL}/${url}`);

        return  response.json();
    } catch (error) {
        console.log('=== error fetch ===', url, error);

        return Promise.reject(error)
    }
}

function updateCache(key, data) {
    dataCache[key].data = data;
    dataCache[key].isLoaded = true;
}

function createRouteController(key) {
    return async (req, res) => {
        if (dataCache[key].isLoaded) {
            console.log(`=== return cached ${key} data ===`);
            res.json(dataCache[key].data);
            return;
        }

        const data = await fetchWrapper(`${key}.json`);

        updateCache(key, data);
        console.warn(`=== return ${key} data ===`);
        res.json(data);
    }
}

function createItem() {
    return {
        date: new Array(),
        isLoaded: false,
    }
}

function createRoute(key) {
    dataCache[key] = createItem();

    return [`/${key}.json`, createRouteController(key)];
}

const expressRoutes = express.Router();

expressRoutes.use('/', (req, res, next) => {
    console.log('=== req.url ===', req.url);
    next();
});

expressRoutes.use(...createRoute('regions'));

expressRoutes.use(...createRoute('countries'));

export const routesMock = expressRoutes;