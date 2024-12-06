import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewCollectionPopup from './NewCollectionPopup';
import CollectionCard from './CollectionCard';

const Profile = (props) => {
    const [cards, setCards] = useState([])
    const [collectionsDisplay, setCollectionsDisplay] = useState(false)
    let { username } = useParams()

    let user = props.user ? props.user : {status: "loggedout"}

    useEffect(() => {
            loadCollections()
    }, []); 

    const loadCollections = async () => {
        if (user.status === "loggedin" && user.userInfo.username === username) {
            await fetch(`/api/v1/collections`)
            .then((res) => res.json())
            .then((data) => {
                setCards(data);
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
