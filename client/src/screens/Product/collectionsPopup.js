import React, {useEffect, useState} from 'react';

const Collection = (props) => {
    const [alreadySaved, setAlreadySaved] = useState(false);
    let collection = props.collection
    let productID = props.productID
    let renderCollections = props.render

    const rerenderCollections = () => {
        renderCollections()
    }

    useEffect(() => {
        const checkAlreadySaved = () => {
            if (collection.products.includes(productID)) {
                console.log("product already saved to collection")
                setAlreadySaved(true)
            } else {
                setAlreadySaved(false)
            }
        }
        checkAlreadySaved();
    } , [collection.products, productID])

    const saveToCollection = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/collections/product?productID=${productID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({collectionID: collection._id})})
            if (response.ok) {
                console.log('collection updated successfully');
                rerenderCollections();
            } else {
                console.error('Failed to submit collection');
            }
        } catch(err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="collection">
            <img src={collection.collection_img} alt={`cover for ${collection.collection_name}`}></img>
            <p>{collection.collection_name}</p>
            {alreadySaved ? <></> : <button onClick={saveToCollection}>Save</button>}
            
        </div>
    )
}

const CollectionsPopup = (props) => {
    const [collections, setCollections] = useState([])
    let productID = props.productID
    let toggleCollectionsPopup = props.callback


    const changeCollectionsPoup = () => {
        toggleCollectionsPopup()
    }
    
    const loadCollections =  async () => {
        await fetch(`/api/v1/collections`)
            .then((res) => res.json())
            .then((data) => {
                console.log("recieved collection data", data);
                setCollections(data);
                console.log("saved collections data", collections)
            })
            .catch((error) => console.error('Error loading collections:', error))
    }

    useEffect(() => {
        loadCollections()
    }, [])


    return (
        <> 
            <div className="filter-overlay"></div>

            <div className="collections-popup">

                <div className="popup-head">
                    <h4>Add to collection</h4>
                    <button onClick={changeCollectionsPoup}><span className="fa fa-minus"></span></button>
                </div>

                {collections.map((collection) => <Collection key={collection._id} productID={productID} collection={collection} render={() => loadCollections()}/> )}

            </div> 
        </>
    )
}

export default CollectionsPopup;