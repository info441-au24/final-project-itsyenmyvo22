import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session'
import WebAppAuthProvider from 'msal-node-wrapper'

import apiV1Router from './routes/api/v1/apiv1.js';
import models from './models.js';
import dotenv from 'dotenv'

dotenv.config();

import {fileURLToPath} from 'url';
import { dirname } from 'path';

const authConfig = {
    auth: {
   	clientId: process.env.CLIENT_ID,
    	authority: process.env.AUTHORITY,
    	clientSecret: process.env.CLIENT_SECRET,
    	redirectUri: "/redirect"
    },
	system: {
    	loggerOptions: {
        	loggerCallback(loglevel, message, containsPii) {
            	console.log(message);
        	},
        	piiLoggingEnabled: false,
        	logLevel: 3,
    	}
	}
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.enable('trust proxy')

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(sessions({
    secret: "this is some secret key I am making up 093u4oih54lkndso8y43hewrdskjf",
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false
}))

const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());

app.use((req, res, next) => {
    req.models = models
    next()
})

app.use('/api/v1', apiV1Router);


// Endpoint to signin
app.get('/signin', (req, res, next) => {
   	 return req.authContext.login({
   		 postLoginRedirectUri: "/", 
   	 })(req, res, next);
});
// Endpoint to signout
app.get('/signout', (req, res, next) => {
   	 return req.authContext.logout({
   		 postLogoutRedirectUri: "/", 
   	 })(req, res, next);
    
});

app.use(authProvider.interactionErrorHandler());

// Catch-all handler to serve a single-page application
app.get(/^\/(?!api|signin|signout|redirect|checkauth).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

export default app;