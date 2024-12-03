import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

app.get('/checkauth', async (req, res) => {
  if(req.session.isAuthenticated) {
      let username = await req.session.account.username
      res.json({ isAuthenticated: true, username: username})
  } else {
      res.json({ isAuthenticated: false })
  }
});

export default router;
