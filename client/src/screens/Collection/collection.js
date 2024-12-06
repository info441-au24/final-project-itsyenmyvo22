import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CollectionItem from './collectionItem';

/* const ProductCard = (props) => {
    const [productInfo, setProductInfo] = useState({})
    let productID = props.product
    let renderProductsCallback = props.render
    let collectionID = props.collectionID

    useEffect(() => {
        loadProduct() 
    }, []); 

    const loadProduct = () => {
        console.log("this is product: ", productID)
        fetch(`/api/v1/posts?productID=${productID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("this is the data:", data);
                if (data) {
                    setProductInfo(data)
                }
            })
            .catch((error) => console.error('Error loading product:', error))
    }

    const removeProduct = async () => {
        let response = await fetch(`/api/v1/collections/product?productID=${productID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ collectionID: collectionID })
        })
        if (response.ok) {
            console.log('Product deleted successfully');
            renderProducts()
        } else {
            console.error('Failed to delete product');
        }
        
    }

    const renderProducts = () => {
            renderProductsCallback()
        }

    return (
        <div class="collection-card">
            <Link to={`/product/${productInfo._id}`}>
                <img src={productInfo.url} alt={`cover image for ${productInfo.name}`}></img>
                <h4>{productInfo.name}</h4>
            </Link>
            <button onClick={() => removeProduct(productID, collectionID)} className="collection-button">Delete</button>
        </div>
    )
} */

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
                console.log("this is the collection we recieved", data);
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