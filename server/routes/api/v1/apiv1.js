import express from 'express';
import postsRouter from './controllers/posts.js';
import reviewsRouter from './controllers/reviews.js';

var router = express.Router();

router.use('/posts', postsRouter);
router.use('/reviews', reviewsRouter);

export default router;
