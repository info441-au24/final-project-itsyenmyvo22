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
import models from './models.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
