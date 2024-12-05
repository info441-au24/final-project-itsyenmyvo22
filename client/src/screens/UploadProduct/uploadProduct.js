import React, { useState } from 'react';

// update css
// connect to db next 
    // post products according to schema
const UploadProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        url: ''
    });

    const handleChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const apiUrl = process.env.REACT_APP_API_URL; // Use the API URL from environment variables
        try {
            //const response = await fetch(`${apiUrl}/api/uploadProduct`, {
            const response = await fetch(`/api/v1/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            });
    
            if (response.ok) {
                console.log('Product uploaded successfully');
                setProduct({ name: '', category: '', price: '', url: '' }); // Reset form
            } else {
                console.error('Failed to upload product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };    

    return (
        <div id='pcontainer'>
            <h1>Upload Product</h1>
            <form id="uploadproduct" onSubmit={handleSubmit}>
                <div id="pdiv">
                    <p>Product Name:</p>
                    <input type="text" name="name" className="prod-input" value={product.name} onChange={handleChange} placeholder="Enter product name..." />
                </div>
                <div id="pdiv">
                    <p>Type of product:</p>
                    <select name="category" className="prod-input" value={product.category} onChange={handleChange} aria-label='Choose the type of beauty product'>
                        <option value="">Select the type of product:</option>
                        <option value="Moisturiser">Moisturiser</option>
                        <option value="Serum">Serum</option>
                        <option value="Oil">Oil</option>
                        <option value="Mist">Mist</option>
                        <option value="Balm">Balm</option>
                        <option value="Mask">Mask</option>
                        <option value="Peel">Peel</option>
                        <option value="Eye Care">Eye Care</option>
                        <option value="Cleanser">Cleanser</option>
                        <option value="Toner">Toner</option>
                        <option value="Exfoliator">Exfoliator</option>
                        <option value="Bath Salts">Bath Salts</option>
                        <option value="Body Wash">Body Wash</option>
                        <option value="Bath Oil">Bath Oil</option>
                    </select>
                </div>
                <div id="pdiv">
                    <p>Price Range:</p>
                    <select name="price" className="prod-input" value={product.price} onChange={handleChange} aria-label='Choose the price range'>
                        <option value="">Select the price range:</option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                    </select>
                </div>
                <div id="pdiv">
                    <p>Image hyperlink:</p>
                    <input type="url" name="url" className="prod-input" value={product.url} onChange={handleChange} placeholder='Enter an image URL...'></input>
                </div>
                <div id='buttondiv'>
                    <button id="uploadProductButton" type='submit'>Submit</button>
                </div>
                <div id='buttondiv'>
                    <button id="uploadProductButton" type="reset" onClick={() => setProduct({ name: '', category: '', price: '', url: '' })}>Reset</button>
                </div>
            </form>
        </div>
    );
};

export default UploadProduct;