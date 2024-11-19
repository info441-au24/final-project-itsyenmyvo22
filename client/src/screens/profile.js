import React, { useState, useEffect } from 'react'; import { Link } from 'react-router-dom';

const Profile = () => {
    const [collections, setCollections] = useState(false);
    const [collectionsDisplay, setCollectionsDisplay] = useState(false)


    const collectionsPopup = () => {
        setCollectionsDisplay(!collectionsDisplay)
    }

    return (
        <div>
            <div class="profile">
                <h2>Username</h2>
                <hr></hr>
                <div class="profile-head">
                    <h3>Collections</h3>
                    
                    <button onClick={collectionsPopup} id="create">Create Collection</button>
                    {collectionsDisplay ?
                        <>
                            <div class="filter-overlay"></div>
                            <div class="create-collections-popup">
                                <div class="popup-head">
                                    <h4>Create Collection</h4>
                                    <button onClick={collectionsPopup}><span class="fa fa-minus"></span></button>
                                </div>
                                <div class="collection-add-info">
                                    <form>
                                        <label for="collectionTitle">Collection Title:</label><br></br>
                                        <input type="text" id="collectionTitle" name="collectionTitle"></input><br></br>
                                        <label for="collectionDescription">Description:</label><br></br>
                                        <input type="text" id="collectionDescription" name="collectionDescription"></input><br></br>
                                        <input type="submit" value="Submit"onClick={collectionsPopup}></input>
                                    </form>
                                </div>
                            </div>
                        </>
                        :
                        <></>

                    }
                </div>
            </div>
            <div class="collections">
                <div class="collection-grid">
                    <div class="collection-card">
                        <img src="https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v4/moisturizing-cream/cerave_moisturizing_cream_16oz_jar_front-700x875-v4.jpg?rev=db6e3c22250e4928bc749dd2c207de5b&w=500&hash=D85F888749CB3F9C74FBBBF73EFA6D40" alt="product"></img>
                        <h4><Link classname='please' to="/collection">Winter 2024</Link></h4>
                        <button>Delete</button>
                    </div>
                    <div class="collection-card">
                        <img src="https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v4/moisturizing-cream/cerave_moisturizing_cream_16oz_jar_front-700x875-v4.jpg?rev=db6e3c22250e4928bc749dd2c207de5b&w=500&hash=D85F888749CB3F9C74FBBBF73EFA6D40" alt="product"></img>
                        <h4>Dry Skin</h4>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;