import express from 'express';

var router = express.Router();

// retrieving existing collections for a user
router.get('/', async (req, res) => {
    console.log('received request for collection(s)')
        try {
            if (!req.session.isAuthenticated) {
                res.status(401).json({status: "error", error: "not logged in"})
            } else {
                console.log("finding collections for", req.session.account.username)
                const username = req.session.account.username
                const collections = await req.models.Collection.find({username: username})
                console.log("retrieved collections", collections)
                res.json(collections)
            }
        } catch(err) {
            console.error('Error fetching collections:', err);
            res.status(500).json({status: 'error', error: err });
        }
    
})

// retrieve collection by ID
router.get('/collection', async (req, res) => {
    console.log('received request for collection(s)')
        try {
            if (!req.session.isAuthenticated) {
                res.status(401).json({status: "error", error: "not logged in"})
            }
            if (req.query.collectionID) {
                console.log("retrieving collection with ID", req.query.collectionID)
                const collectionID = req.query.collectionID
                const collection = await req.models.Collection.findOne({_id: collectionID})
                console.log("retrieved collection", collection)
                res.json(collection)
            }
            } catch(err) {
            console.error('Error fetching collection:', err);
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

// deleting a collection
router.delete('/', async (req, res) => {
    try {
    const collectionID = req.query.collectionID
    await req.models.Collection.deleteOne({_id: collectionID})

    res.json({status: "success"})

    } catch (error) {
        console.log("error")
        res.status(500).json({ "status": "error", "error": error.message })
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
        await req.models.Collection.updateOne({ _id: req.body.collectionID}, {products: collection.products})
        res.json({status: "success"})
    } catch (err) {
        console.error('Error saving to collection:', err);
        res.status(500).json({status: 'error', error: err });
    }
})


// deleting a product from a collection
router.delete('/product', async (req, res) => {
    try {
        if (!req.session.isAuthenticated) {
            res.status(401).json({status: "error", error: "not logged in"})
        }
        const collectionID = req.body.collectionID
        const productID = req.query.productID
        let collection = await req.models.Collection.findById(collectionID)
        console.log("BEFORE", collection.products)
        let productArray = collection.products
        if(productArray.includes(productID)) {
            collection.products = collection.products.filter(function (id) {
                return id != productID
            })
        }

        console.log("AFTER", collection.products)
        await collection.save()
        res.json({status: "success"})

        } catch (err) {
            console.log("error")
            res.status(500).json({ "status": "error", "error": err })
        }
})


export default router;