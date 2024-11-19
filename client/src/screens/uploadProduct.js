import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/App.css'

// update css
// connect to db next 
    // post products according to schema
const UploadProduct = () => {
    return (
        <div id='pcontainer'>
            <h1>This is the upload product page</h1>
            <form id="uploadproduct">
                <div id="pdiv">
                    <p>Product name:</p>
                    <input 
                        type="text" 
                        id="pname"
                        className="prod-input" 
                        placeholder="Enter product name..."
                    />
                </div>
                <div id="pdiv">
                    <p>Type of product:</p>
                    <select 
                        className="prod-input"  
                        aria-label='Choose the type of beauty product'
                        defaultValue="none"
                    >
                        <option value='none'>Select the type of product:</option>
                        <option value="Skin Care">Skin Care</option>
                        <option value="Hair Care">Hair Care</option>
                        <option value="Not Listed">Not Listed</option>
                    </select>
                </div>
                <div id="pdiv">
                    <p>Price Range:</p>
                    <select 
                        className="prod-input" 
                        aria-label='Choose the price range'
                        defaultValue="none"
                    >
                        <option value='none'>Select the price range:</option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                    </select>
                </div>
                <div id="pdiv">
                    <p>Image hyperlink:</p>
                    <input className="prod-input" type="url" placeholder='Enter an image URL...'></input>
                </div>
                <div id='buttondiv'>
                    <input id='pbutton' type='submit' value='Submit'></input>
                </div>
                <div id='buttondiv'>
                    <input id='pbutton' type="reset" value="Reset"></input>
                </div>
            </form>
        </div>
    );
};

export default UploadProduct;