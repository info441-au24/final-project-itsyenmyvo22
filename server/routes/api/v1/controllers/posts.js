import express from 'express';
import models from '../../../../models.js';

const router = express.Router();

router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
      const posts = await models.Post.find({
        name: { $regex: query, $options: 'i' }, // Case-insensitive search
      });
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
  
export default router;
