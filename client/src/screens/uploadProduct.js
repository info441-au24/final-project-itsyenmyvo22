import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/App.css'

const UploadProduct = () => {
    return (
        <div>
            <h1>This is the upload product page</h1>
            <form id="uploadproduct">
                <div id="namediv">
                    <p>Product name:</p>
                    <input type="text" id="pname"></input>
                </div>
                <div id="typediv">
                    <p>Type of product:</p>
                    <select class="form-select" aria-label='Choose the type of beauty product'>
                        <option selected>Type of Product:</option>
                        <option value="Skin Care">Skin Care</option>
                        <option value="Hair Care">Hair Care</option>
                        <option value="Not Listed">Not Listed</option>
                    </select>
                </div>
                <div id="pricediv">
                    <p>Price Range:</p>
                    <select class="form-select" aria-label='Choose the price range'>
                        <option selected></option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                    </select>
                </div>
                <div id="imagediv">
                    <p>Image hyperlink:</p>
                    <input type="url"></input>
                </div>
                <input type='submit' value='Submit'></input>
                <input type="reset" value="Reset"></input>
            </form>
        </div>
    );
};

export default UploadProduct;