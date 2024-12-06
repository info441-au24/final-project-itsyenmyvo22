import React from 'react';
import {Link} from 'react-router-dom';

const ProductPreview = (props) => {
    let product = props.product

    return (
      <div key={product._id} className="card">
        <Link to={`product/${product._id}`}>
        <img src={product.url} alt={product.name} className="product-image" />
        <h4>{product.name}</h4>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        </Link>
      </div>
    )

}

export default ProductPreview;