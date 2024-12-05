import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';
import WebAppAuthProvider from 'msal-node-wrapper';

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

///////////////////////////////////////////////

// Endpoint to search posts by name or return all if no query
/* app.get('/api/search', async (req, res) => {
    const {query, price, category} = req.query;
    let filter = {};
    if (query) filter.name = {$regex: new RegExp(query, 'i')};
    if (price) filter.price = price;
    if (category) filter.category = category;

    try {
        const posts = await models.Post.find(filter);
        if (posts.length === 0) {
            return res.status(404).json({message: 'No posts found'});
        }
        res.json(posts);
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}); */

// Endpoint to handle product uploads
/* app.post('/api/uploadProduct', async (req, res) => {
    const {name, category, price, url} = req.body;

    try {
        const newProduct = new models.Post({
            name, 
            category,
            price,
            url
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.log('Error creating new product:', error);
        res.status(500).json({message: 'Failed to create product'});
    }
}) */

/* app.post('/api/profile', async (req, res) => {
    try {
        let username = req.session.account.username
        const newCollection = new models.Collection({
            username: username, 
            collection_name: req.body.name,
            products: [],
            collection_description: req.body.description,
            collection_img: req.body.img
        })

        await newCollection.save()
        res.send({ "status": "success" })

    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({ "status": "error", "error": error })
    }
}) */

/* app.get('/api/profile', async (req, res) => {
    try {
        const currentUser = req.query.username
        const collections = await models.Collection.find({username:currentUser})

        res.send(collections)
    } catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error", "error": error })
    }
}) */

/* // Endpoint to see identity information
app.get('/myIdentity', async (req, res) => {

    if(req.session.isAuthenticated) {
      let name = await req.session.account.name
      let username = await req.session.account.username
        res.json({
          status: "loggedin", 
          userInfo: {
             name: name, 
             username: username
            }
       })
    } else {
      res.json({status: "loggedout"})
    }
 }); 
 */