import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CollectionItem from './CollectionItem';

const Collection = (props) => {
    const [collection, setCollection] = useState({});
    const [products, setProducts] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const { collectionID } = useParams()

    let user = props.user ? props.user : {status: "loggedout"}

    useEffect(() => {
        loadCollection()
    }, []);

    const loadCollection = async () => {
        if (user.status === "loggedin") {
            setIsDataLoading(true)
            await fetch(`/api/v1/collections/collection?collectionID=${collectionID}`)
            .then((res) => res.json())
            .then((data) => {
                setCollection(data);
                setProducts(data.products)
                setIsDataLoading(false);
            })
            .catch((error) => {
                console.error('Error loading collection:', error);
            });
        }
    }

    return (
        <div id="collection-container">
            {user.status === "loggedin" ? (
                <>
                    <div className="collection-info">
                        <div id="collection-head">
                            <h2>{collection.collection_name}</h2>
                            <p id="collection-description">{collection.collection_description}</p>
                            <p id="collection-size">{products.length} products</p>
                        </div>
                        
                        <hr />

                        <div className="collection-btns">
                            <Link className="goBack" to={`/profile/${user.userInfo.username}`}><i id="back-to-collections-btn" className="fa fa-arrow-left"></i></Link>
                            <Link to="/"><button className="small-button">Add Product</button></Link>
                        </div>
                    </div>
                    
                    <div className="collection-grid">
                        {!isDataLoading && products.map((productID) => 
                        <CollectionItem key={productID}
                            product={productID}
                            collectionID={collectionID}
                            render={() => loadCollection()}/>)}
                    </div>
                </>
            ) : (
                <p>Please log in to view your collection.</p>
            )}
        </div>
    );

};

export default Collection;