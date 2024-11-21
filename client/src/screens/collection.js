import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Collection = () => {
    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);

    return (
        <div>
            <div class="profile">
                <h2>Username</h2>
                <hr></hr>
                <div class="profile-head">
                    <h3><Link className='goBack' to="/profile">←</Link> Winter 2024</h3>
                </div>
            </div>
            <div class="collectionDescription">
                <p>I typicially have oily skin, but it gets super dry in the winter. These are my holygrails for the tranisiton into the cooler months!</p>
            </div>
            <div class="collection-grid">
                <div class="collection-card">
                    <Link to="/profile">
                        <img src="https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v4/moisturizing-cream/cerave_moisturizing_cream_16oz_jar_front-700x875-v4.jpg?rev=db6e3c22250e4928bc749dd2c207de5b&w=500&hash=D85F888749CB3F9C74FBBBF73EFA6D40" alt="product"></img>
                        <h4>Cerave</h4>
                    </Link>
                    <button class="collection-button">Delete</button>

                </div>
                
                <div class="collection-card">
                    <Link to="/profile">
                        <img src="https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v4/moisturizing-cream/cerave_moisturizing_cream_16oz_jar_front-700x875-v4.jpg?rev=db6e3c22250e4928bc749dd2c207de5b&w=500&hash=D85F888749CB3F9C74FBBBF73EFA6D40" alt="product"></img>
                        <h4>Cerave</h4>
                    </Link>
                    <button class="collection-button">Delete</button>

                </div>
                <div class="collection-card">
                    <Link to="/profile">
                        <img src="https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v4/moisturizing-cream/cerave_moisturizing_cream_16oz_jar_front-700x875-v4.jpg?rev=db6e3c22250e4928bc749dd2c207de5b&w=500&hash=D85F888749CB3F9C74FBBBF73EFA6D40" alt="product"></img>
                        <h4>Cerave</h4>
                    </Link>
                    <button class="collection-button">Delete</button>

                </div>
                <div class="collection-card">
                    <Link to="/profile">
                        <img src="https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v4/moisturizing-cream/cerave_moisturizing_cream_16oz_jar_front-700x875-v4.jpg?rev=db6e3c22250e4928bc749dd2c207de5b&w=500&hash=D85F888749CB3F9C74FBBBF73EFA6D40" alt="product"></img>
                        <h4>Cerave</h4>
                    </Link>
                    <button class="collection-button">Delete</button>

                </div>
                <div class="collection-card">
                    <Link to="/profile">
                        <img src="https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v4/moisturizing-cream/cerave_moisturizing_cream_16oz_jar_front-700x875-v4.jpg?rev=db6e3c22250e4928bc749dd2c207de5b&w=500&hash=D85F888749CB3F9C74FBBBF73EFA6D40" alt="product"></img>
                        <h4>Cerave</h4>
                    </Link>
                    <button class="collection-button">Delete</button>

                </div>
                <div class="collection-card">
                    <Link to="/profile">
                        <img src="https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v4/moisturizing-cream/cerave_moisturizing_cream_16oz_jar_front-700x875-v4.jpg?rev=db6e3c22250e4928bc749dd2c207de5b&w=500&hash=D85F888749CB3F9C74FBBBF73EFA6D40" alt="product"></img>
                        <h4>Cerave</h4>
                    </Link>
                    <button class="collection-button">Delete</button>

                </div>
                
            </div>
        </div>
    );
};

export default Collection;