import express from 'express';

var router = express.Router();

// retrieving existing collections for a user
router.get('/', async (req, res) => {
    console.log('received request for collections')
        try {
            console.log("finding collections")
            // const username = req.session.account.username
            const username = 'test-acc'
            const collections = await req.models.Collection.find({username: username})
            console.log("retrieved data", collections)
            res.json(collections)
        } catch(err) {
            console.error('Error fetching collections:', err);
            res.status(500).json({status: 'error', error: err });
        }
    
})

// creating a new collection
router.post('/', async (req, res) => {
    try {
        if (!req.session.isAuthenticated) {
            res.status(401).json({status: "error", error: "not logged in"})
        }
        console.log(req.body)
        const newCollection = new req.models.Collection({
            username: req.session.account.username,
            collection_name: req.body.name,
            products: [],
            collection_description: req.body.description,
            collection_img: req.body.img
        })

        await newCollection.save()
        res.send({ "status": "success" })

    } catch (error) {
        console.log("Error creating collection")
        res.status(500).json({ "status": "error", "error": error })
    }

})

// adding a product to a collection
router.post('/product', async (req, res) => {
    console.log('received request to add product to collection')
    try {
        console.log("finding collection")
        const collection = await req.models.Collection.findOne({_id: req.body.collectionID})
        console.log("retrieved data", collection)
        collection.products.push(req.query.productID)
        console.log(collection.products)
        await req.models.Collection.updateOne({ _id: req.query.collectionID}, {products: collection.products})
        res.json({status: "success"})
    } catch (err) {
        console.error('Error saving to collection:', err);
        res.status(500).json({status: 'error', error: err });
    }
})

export default router;