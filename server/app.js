// import express from 'express';
// import path from 'path';
// import express from 'express';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';
// import apiV1Router from './routes/api/v1/apiv1.js'; // Import API routes

// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use('/api/v1', apiV1Router);
// app.use(express.static(join(__dirname, 'public'))); 

// export default app;

///////////////////////////////////////

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import apiV1Router from './routes/api/v1/apiv1.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/v1', apiV1Router);
app.use(express.static(join(__dirname, 'public')));

export default app;
