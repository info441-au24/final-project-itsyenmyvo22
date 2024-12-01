import express from 'express';

var router = express.Router();

router.get('/', async (req, res) => {
    console.log('received request for collections')
    try {
        console.log("finding collections")
        // const username = req.session.account.username
        const username = "test-acc"
        const collections = await req.models.Collection.find({username: username})
        console.log("retrieved data", collections)
        res.json(collections)
    } catch(err) {
        console.error('Error fetching collections:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.post('/', async (req, res) => {
    console.log('received request to add product to collection')
    try {
        console.log("finding collection")
        const collection = await req.models.Collection.findOne({_id: req.query.collectionID})
        console.log("retrieved data", collection)
        collection.products.push(req.body.productID)
        console.log(collection.products)
        await req.models.Collection.updateOne({ _id: req.query.collectionID}, {products: collection.products})
        res.json({status: "success"})
    } catch (err) {
        console.error('Error saving to collection:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

export default router;