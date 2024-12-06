import React, {useEffect, useState} from 'react';

const Collection = (props) => {
    const [alreadySaved, setAlreadySaved] = useState(false);
    let collection = props.collection
    let productID = props.productID
    let renderCollectionsCallback = props.render

    const renderCollections = () => {
        renderCollectionsCallback()
    }

    useEffect(() => {
        const checkAlreadySaved = () => {
            if (collection.products.includes(productID)) {
                setAlreadySaved(true)
            } else {
                setAlreadySaved(false)
            }
        }
        checkAlreadySaved();
    } , [collection, productID])

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
                renderCollections();
            } else {
                throw new Error('Failed to submit collection');
            }
        } catch(err) {
            console.error('Error:', err);
            alert(`Whoops! We couldn't save this product to your collection.`)
        }
    };

    return (
        <div className="collection">
            <div>
                <img src={collection.collection_img} alt={`cover for ${collection.collection_name}`}></img>
                <p>{collection.collection_name}</p>
            </div>
            {alreadySaved ? <i className="fa-solid fa-circle-check unselected"></i> : <button className="remove-default" onClick={saveToCollection}><i className="fa-regular fa-circle selected"></i></button>}
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
                setCollections(data);
            })
            .catch((error) => console.error('Error loading collections:', error))
    }

    useEffect(() => {
        loadCollections()
    }, [])


    return (
        <> 
            <div className="filter-overlay"></div>

            <div className="popup-container">

                <div className="popup-head">
                    <h4>Add to collection</h4>
                    <button className="remove-default close-popup" onClick={changeCollectionsPoup}><span className="fa fa-x"></span></button>
                </div>

                {collections.map((collection) => <Collection 
                                                    key={collection._id} 
                                                    productID={productID} 
                                                    collection={collection} 
                                                    render={() => loadCollections()}/> )}

            </div> 
        </>
    )
}

export default CollectionsPopup;