import express from 'express';

var router = express.Router();

router.get('/myIdentity', async (req, res) => {
  try {
     if (req.session.isAuthenticated) {
    res.json({
        status: "loggedin", 
        userInfo: {
           name: req.session.account.name, 
           username: req.session.account.username}
      })
  } else {
      res.json({status: "loggedout"})
  }
  } catch(err) {
    console.log("Error retrieving identity", err)
    res.status(500).json({status: "error", error: err})
  }
 
});

export default router;
