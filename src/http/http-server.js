import express from 'express';
import fileUpload from 'express-fileupload';
// import reload from 'express-reload';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { routes } from './routes-v1/index.js';
import { routesMock } from './routes-mock/index.js';
import {
  API_PATH,
  API_VERSIONS,
  KEEP_ALIVE_TIMEOUT,
  RELOAD_API_PATH,
  ServerParams,
} from '../constants.js';
import { handleServerStart } from './handlers.js';

const { PORT, HOST } = ServerParams;

const app = express();
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 1000, // limit each IP requests per windowMs
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(fileUpload());
app.use(cors());
app.use(cookieParser());
app.use(express.static('dist'));
app.get('/', (req, res) => {res.send('server running');});
app.get('/regions.json', (req, res) => {res.send('proxy server running');});
app.use(`${API_PATH}${API_VERSIONS.V1}`, routes);
app.use(`${API_PATH}${API_VERSIONS.MOCK}`, routesMock);

// http://192.168.178.27:3000
export const startHttpServer = () => Promise.resolve(app.listen(PORT, HOST, handleServerStart)).then(server => {
  server.keepAliveTimeout = KEEP_ALIVE_TIMEOUT;
  return Promise.resolve(server);
});