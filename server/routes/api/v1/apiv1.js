import express from 'express';
import postsRouter from './controllers/posts.js';
import reviewsRouter from './controllers/reviews.js';
import collectionsRouter from './controllers/collections.js';
import usersRouter from './controllers/users.js';

var router = express.Router();

router.use('/posts', postsRouter);
router.use('/reviews', reviewsRouter);
router.use('/collections', collectionsRouter);
router.use('/users', usersRouter);

export default router;
