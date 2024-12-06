import express from 'express';

const router = express.Router();

// search products
router.get('/search', async (req, res) => {
    const {query, price, category} = req.query;
    let filter = {};
    if (query) filter.name = {$regex: new RegExp(query, 'i')};
    if (price) filter.price = price;
    if (category) filter.category = category;

    try {
        const posts = await req.models.Post.find(filter);
        if (posts.length === 0) {
            return res.status(404).json({message: 'No posts found'});
        } else {
          res.json(posts);
        }
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({status: 'error', error: err });
    }
});

// upload product
router.post('/', async (req, res) => {
  const {name, category, price, url} = req.body;
  try {
      const newProduct = new req.models.Post({
          name, 
          category,
          price,
          url
      });
      await newProduct.save();
      res.json(newProduct);
  } catch (error) {
      console.log('Error creating new product:', error);
      res.status(500).json({status: 'error', error: err });
  }
})

// find specific product information
router.get('/', async (req, res) => {
  try {
    if (req.query.productID) {
        console.log("finding product with ID:", req.query.productID)
        const productID = req.query.productID
        const product = await req.models.Post.findOne({_id: productID})
        res.send(product)
    } 
  } catch (err) {
    console.log('Error finding product info:', err);
    res.status(500).json({status: 'error', error: err });
  }
})
  
export default router;
