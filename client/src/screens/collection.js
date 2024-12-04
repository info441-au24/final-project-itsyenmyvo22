import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductCard = (props) => {
    const [productInfo, setProductInfo] = useState({})
    let productID = props.product
    let renderProductsCallback = props.render
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
    const [collection, setCollection] = useState({});
    const [products, setProducts] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const { collectionID } = useParams()


    let user = props.user

    const loadCollection = async () => {
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
                console.error('Error loading products:', error);
            });


    }

    useEffect(() => {
        loadCollection()
    }, []);


    return (
        <div>
            {user ? (
                <div>
                    <div className="profile">
                        <h2>{user.name}</h2>
                        <hr />
                        <div className="profile-head">
                            <h3>
                                <Link className="goBack" to={`/profile/${user.username}`}>
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
                        {isDataLoading ? <></> : products.map((product) => 
                        <ProductCard key={product}
                            product={product}
                            collectionID={collectionID}
                            render={() => loadCollection()}/>)}
                    </div>
                            {/* /* return <ProductCard
                            key={product}
                            product={product}
                            collectionID={collectionID}
                            render={() => loadCollection()}
                                                /> */ }
                </div>
            ) : (
                <div>Please log in to view your collection.</div>
            )}
        </div>
    );

};

export default Collection;