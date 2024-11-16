import React from 'react';
import { Link } from 'react-router-dom';

const Product = () => {
    return (
        <div>
            <h1>This is the product page</h1>
            <Link to="/">Go to home</Link>
        </div>
    );
};

export default Product;