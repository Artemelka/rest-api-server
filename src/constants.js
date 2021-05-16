// SERVER CONST
const ONE_MINUTE = 60000;
export const KEEP_ALIVE_TIMEOUT = ONE_MINUTE * 2;
export const RELOAD_API_PATH = `${__dirname}/http/routes-v1/`;
export const API_PATH = '/api';
export const API_VERSIONS ={
    V1: '/v1'
}

export const ServerParams = {
    PORT: 8080,
    SOCKET_PORT: 4000,
    HOST: 'localhost'
};

export const ProxyParams = {
    URL: [`${API_PATH}/**`],
    SERVER: `http://${ServerParams.HOST}:${ServerParams.PORT}`,
    SOCKET: `ws://${ServerParams.HOST}:${ServerParams.SOCKET_PORT}`
};

// DB CONST
const DB_USER = 'reactHomeAdmin';
const DB_PASSWORD = '61406140';
const DB_URL_PARAMS = 'retryWrites=true&w=majority';
const DB_HOST = '@cluster0-ahlbz.gcp.mongodb.net';
export const DB_NAME = 'ReactComponentUiKit';
export const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_HOST}/${DB_NAME}?${DB_URL_PARAMS}`;

export const DbConnectParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
