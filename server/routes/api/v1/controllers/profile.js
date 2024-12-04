import express from 'express';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        let username = req.session.account.username
        const newCollection = new req.models.Collection({
            username: username, //to update later
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

router.get('/collections', async (req, res) => {
    try {
        console.log("HELLLLLLO")
        const currentCollection = req.query.collectionID
        const collection = await req.models.Collection.findById({currentCollection})
        res.json(collection)

    } catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

router.delete('/', async (req, res) => {
    try {
    console.log("inside delete")
    const collectionID = req.body.collectionID
    let collection = await req.models.Collection.findById(collectionID)
    console.log("this is the collection", collection)
    await req.models.Collection.deleteOne({_id: collectionID})

    let updated = await req.modelsCollection.find({username: "test-acc"})
    console.log("this is updated", updated)

    res.json({status: "success"})

    } catch (error) {
        console.log("error")
        res.status(500).json({ "status": "error", "error": error.message })
    }
})

router.delete('/collections', async (req, res) => {
    try {
    console.log("inside delete collections")
    const collectionID = req.body.collectionID
    const productID = req.body.productID
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

    } catch (error) {
        console.log("error")
        res.status(500).json({ "status": "error", "error": error.message })
    }
})


export default router;
