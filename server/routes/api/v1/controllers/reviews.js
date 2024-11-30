import express from 'express';

const router = express.Router();

// get reviews

router.get('/', async (req, res) => {
    try {
        let reviews = await req.models.Comment.find({productID: req.query.postID})
        let reviewsData = await Promise.all(
            reviews.map(async review => { 
                return {
                    id: review._id, 
                    username: review.username, 
                    productID: review.productID, 
                    rating: review.rating,
                    created_date: review.created_date
                }
            })
            )
            res.send(reviewsData)
    } catch (err) {
        console.log("error connecting to db", err)
        res.status(500).json({status: "error", error: err})
    }
    
})
// post reviews

router.post('/', async (req, res) => {
  try {
    /* if (!req.session.isAuthenticated) {
        res.status(401).json({status: "error", error: "not logged in"})
    } */
   console.log(req.body)
   const newReview = new req.models.Review ({
        /* username: req.session.account.username, */
        username: req.body.username,
        productID: req.query.productID,
        review: req.body.review,
        rating: req.body.rating,
        comments: [],
        created_date: Date.now()
  })

  console.log(newReview)
  await newReview.save()
    res.json(({"status": "success"}))
  } catch (err) {
      res.status(500).json({ status: "error", error: err });
  }
})
  
export default router;
