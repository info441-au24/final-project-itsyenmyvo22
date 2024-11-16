import React from 'react';
import { Link } from 'react-router-dom';

const UploadProduct = () => {
    return (
        <div>
            <h1>This is the upload product page</h1>
            <Link to="/product">Go to product</Link>
        </div>
    );
};

export default UploadProduct;