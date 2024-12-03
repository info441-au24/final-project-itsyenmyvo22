import express from 'express';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const newCollection = new req.models.Collection({
            username: "test-acc", //to update later
            collection_name: req.body.name,
            products: [],
            collection_description: req.body.description,
            collection_img: req.body.img
        })

        await newCollection.save()
        res.send({ "status": "success" })

    } catch (error) {
        console.log("error")
        res.status(500).json({ "status": "error", "error": error })
    }

})

router.get('/', async (req, res) => {
    try {
        const currentUser = req.query.username
        const collections = await req.models.Collection.find({username:currentUser})

        res.send(collections)

    } catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

router.get('/checkauth', async (req, res) => {
    try {
        if (req.session.account.isAuthenticated) {
            res.json({ isAuthenticated: true, user: req.session.account.username})
        } else {
            res.json({ isAuthenticated: false, user: null})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error", "error": error })
    }
})


export default router;
