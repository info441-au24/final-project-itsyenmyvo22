// import express from 'express';
// import path from 'path';
// import apiV1Router from './routes/api/v1/apiv1.js'; // Import API routes (apiv1.js)

// const app = express();
// const port = process.env.PORT || 3000;

// // Use API routes defined in apiv1.js
// app.use('/api/v1', apiV1Router);

// // Serve React app from the build folder (for production)
// app.use(express.static(path.join(__dirname, 'client/build')));

// // Catch-all route to serve the React app for all other paths
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

///////////////////////////

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import models from './models.js';
import path from 'path';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

import apiV1Router from './routes/api/v1/apiv1.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// should be unneccesary
// const port = process.env.PORT || 3001;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    req.models = models
    next()
})

app.use('/api/v1', apiV1Router);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Endpoint to search posts by name or return all if no query
app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    let posts;
    try {
        if (query) {
            posts = await models.Post.find({
                name: { $regex: new RegExp(query, 'i') }
            });
        } else {
            posts = await models.Post.find({});
        }

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }

        res.json(posts);
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Endpoint to handle product uploads
app.post('/api/uploadProduct', async (req, res) => {
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
})

app.post('/api/profile', async (req, res) => {
    try {
        const newCollection = new models.Collection({
            username: "test-acc", //to update later
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
})

app.get('/api/profile', async (req, res) => {
    try {
        const currentUser = req.query.username
        const collections = await models.Collection.find({username:currentUser})

        res.send(collections)
    } catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

/* app.get('/api/product', async (req, res) => {
    try {
        console.log("finding product")
        const productID = req.query.productID
        const product = await models.Post.findOne({_id: productID})
        res.send(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error", "error": error })
    }
}) */

// Catch-all handler to serve a single-page application
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

export default app;