import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CollectionItem = (props) => {
    const [productInfo, setProductInfo] = useState({})
    let productID = props.product
    let renderProductsCallback = props.render
    let collectionID = props.collectionID

    useEffect(() => {
        loadProduct() 
    }, []); 

    const loadProduct = async () => {
        await fetch(`/api/v1/posts?productID=${productID}`)
            .then((res) => res.json())
            .then((data) => {
                setProductInfo(data)
            })
            .catch((error) => console.error('Error loading product:', error))
    }

    const removeProduct = async () => {
        try {
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
                throw new Error("Product could not be deleted", response)
            }
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
        
    }

    const renderProducts = () => {
            renderProductsCallback()
        }

    return (
        <div className="collection-card">
            <Link to={`/product/${productInfo._id}`}>
                <img src={productInfo.url} alt={`cover image for ${productInfo.name}`}></img>
                <h4>{productInfo.name}</h4>
            </Link>
            <button onClick={() => removeProduct()} className="small-button">Delete</button>
        </div>
    )
}

export default CollectionItem;