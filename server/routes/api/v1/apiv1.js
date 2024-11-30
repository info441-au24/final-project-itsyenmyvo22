import express from 'express';
import postsRouter from './controllers/posts.js';
import reviewsRouter from './controllers/reviews.js';
import profileRouter from './controllers/profile.js';
import collectionsRouter from './controllers/collections.js'

var router = express.Router();

router.use('/posts', postsRouter);
router.use('/reviews', reviewsRouter);
router.use('/profile', profileRouter);
router.use('/collections', collectionsRouter);

export default router;
