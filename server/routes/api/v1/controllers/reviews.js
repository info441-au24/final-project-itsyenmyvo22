import express from 'express';

const router = express.Router();

// get reviews

router.get('/', async (req, res) => {
    try {
        let reviews = await req.models.Review.find({productID: req.query.productID})
        console.log("found total of", reviews.length, "reviews")
        res.send(reviews)
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

router.get('/comments', async (req, res) => {
    try {
        console.log("received request for comment with ID", req.query.commentID)
        let comment = await req.models.Comment.findOne({_id: req.query.commentID})
        console.log("this is the comment data", comment)
        res.json(comment)
    } catch (err) {
        console.log("error connecting to db", err)
        res.status(500).json({status: "error", error: err})
    }
})

router.post('/comments', async (req, res) => {
    try {
      /* if (!req.session.isAuthenticated) {
          res.status(401).json({status: "error", error: "not logged in"})
      } */
     console.log(req.body)
     const newComment = new req.models.Comment ({
          /* username: req.session.account.username, */
          username: req.body.username,
          comment: req.body.comment,
          created_date: Date.now()
    })
    console.log(newComment)
    await newComment.save()
    let currentReview = await req.models.Review.findOne({_id: req.query.reviewID})
    console.log(currentReview)
    currentReview.comments.push(newComment._id)
    console.log(currentReview.comments)
    await req.models.Review.updateOne({ _id: currentReview._id}, {comments: currentReview.comments})
    res.json({status: "success"})
    } catch (err) {
        res.status(500).json({ status: "error", error: err });
    }
  })
  
export default router;
