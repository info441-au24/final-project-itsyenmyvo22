import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NewCollectionPopup from './NewCollectionPopup';
import CollectionCard from './collectionCard';

const Profile = (props) => {
    const [cards, setCards] = useState([])
    const [collectionsDisplay, setCollectionsDisplay] = useState(false)
    let { username } = useParams()

    let user = props.user ? props.user : {status: "loggedout"}

    useEffect(() => {
            loadCollections()
    }, []); 

    const loadCollections = () => {
        if (user.status === "loggedin" && user.userInfo.username === username) {
            fetch(`/api/v1/collections`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (user) {
                    console.log(data);
                    setCards(data);
                }
            })
            .catch((error) => {
                console.error('Error loading collections:', error);
            });
        }
        
    };    

    return (
        <div>
            {user.status === "loggedin" && user.userInfo.username === username ? (
                <>
                    <div id="profile-info">
                        <h2>Welcome, {user.userInfo.name}</h2>
                        <hr />
                        <div className="profile-head">
                            <h3>Collections</h3>

                            <button onClick={() => setCollectionsDisplay(!collectionsDisplay)} className="medium-button">
                                Create Collection
                            </button>
                            {collectionsDisplay && <NewCollectionPopup callback={() => setCollectionsDisplay(!collectionsDisplay)} 
                            render={() => loadCollections()}/>}
                        </div>
                    </div>
                    <div class="collections">
                        <div className="collection-grid">
                            {cards.map((card) => (
                                <CollectionCard collection={card} render={() => loadCollections()}/>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <h2>Please log in to view your collections.</h2>
            )}
        </div>
    );
};

export default Profile;
