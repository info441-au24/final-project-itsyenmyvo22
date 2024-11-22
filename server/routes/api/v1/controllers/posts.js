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

router.post('/', async (req, res) => {
  try {
    let newPost = new req.models.Post ({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      url: req.body.url
  })
  
    await newPost.save()
    res.json(({"status": "success"}))
  } catch (error) {
      res.status(500).json({ 'message': error.message });
  }
})
  
export default router;
