import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductCard = (props) => {
    const [productInfo, setProductInfo] = useState({})
    let productID = props.product
    let renderProductsCallback = props.loadCollectionProducts
    let collectionID = props.collectionID

    const renderProducts = () => {
        renderProductsCallback()
    }

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

    useEffect(() => {
        loadProduct()  // Call the fetch function on mount
    }, []);  // Include productID as a dependency in case it changes

    return (
        <div class="collection-card">
            <Link to={`/product/${productInfo._id}`}>
                <img src={productInfo.url} alt={`cover image for ${productInfo.name}`}></img>
                <h4>{productInfo.name}</h4>
            </Link>
            <button onClick={() => removeProduct(productID, collectionID)} className="collection-button">Delete</button>
        </div>
    )
}

const Collection = (props) => {
    const [collection, setCollection] = useState([]);
    const [products, setProducts] = useState([])
    const { collectionID } = useParams()

    let user = props.user

    const loadCollectionProducts = async () => {
        await fetch(`/api/v1/collections?collectionID=${collectionID}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCollection(data)
                setProducts(data.products)
                console.log("this is the products", data.products)
            })
            .catch((error) => {
                console.error('Error loading products:', error);
            });


    }

    useEffect(() => {
        if (user) {
            loadCollectionProducts()
        }
    }, [user, collection]);


    return (
        <div>
            {user ? (
                <div>
                    <div className="profile">
                        <h2>{user.name}</h2>
                        <hr />
                        <div className="profile-head">
                            <h3>
                                <Link className="goBack" to="/profile">
                                    ←
                                </Link>
                                {collection.collection_name}
                            </h3>
                        </div>
                    </div>
                    <div className="collectionDescription">
                        <p>{collection.collection_description}</p>
                    </div>
                    <div className="collection-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product}
                                product={product}
                                loadCollectionProducts={() => loadCollectionProducts()}
                                collectionID={collectionID}
                            />

                        ))}
                    </div>
                </div>
            ) : (
                <div>Please log in to view your collection.</div>
            )}
        </div>
    );

};

export default Collection;