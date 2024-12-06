import express from 'express';

const router = express.Router();

// get reviews
router.get('/', async (req, res) => {
    try {
        if (req.query.productID) {
            let reviews = await req.models.Review.find({productID: req.query.productID})
            console.log("found total of", reviews.length, "reviews")
            res.send(reviews)
        } else {
            res.status(404).json({status: "error", error: "requires product ID"})
        }
    } catch (err) {
        console.log("error connecting to db", err)
        res.status(500).json({status: "error", error: err})
    }
    
})

// write a review
router.post('/', async (req, res) => {
  try {
    if (!req.session.isAuthenticated) {
        res.status(401).json({status: "error", error: "not logged in"})
    } else {
        console.log(req.body)
        const newReview = new req.models.Review ({
            username: req.session.account.username,
            productID: req.query.productID,
            review: req.body.review,
            rating: req.body.rating,
            comments: [],
            created_date: Date.now()
        })
        console.log(newReview)
        await newReview.save()
    res.json(({"status": "success"}))
    }
    
  } catch (err) {
    console.log("Error saving review", err)
      res.status(500).json({ status: "error", error: err });
  }
})

// retrieve comment
router.get('/comments', async (req, res) => {
    try {
        if (req.query.commentID) {
            let comment = await req.models.Comment.findOne({_id: req.query.commentID})
            console.log("this is the comment data", comment)
            res.json(comment)
        } else {
            res.status(404).json({status: "error", error: "requires comment ID"})
        }
    } catch (err) {
        console.log("error connecting to db", err)
        res.status(500).json({status: "error", error: err})
    }
})

// write a comment
router.post('/comments', async (req, res) => {
    try {
      if (!req.session.isAuthenticated) {
          res.status(401).json({status: "error", error: "not logged in"})
      } else {
        console.log(req.body)
        const newComment = new req.models.Comment ({
            username: req.session.account.username,
            comment: req.body.comment,
            created_date: Date.now()
        })
        await newComment.save()

        let currentReview = await req.models.Review.findOne({_id: req.query.reviewID})
        currentReview.comments.push(newComment._id)
        await req.models.Review.updateOne({ _id: currentReview._id}, {comments: currentReview.comments})
        res.json({status: "success"})
      }
    } catch (err) {
        console.log("Error saving comment", err)
        res.status(500).json({ status: "error", error: err });
    }
  })
  
export default router;
