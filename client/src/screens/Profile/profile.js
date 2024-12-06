import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Profile = (props) => {
    const [cards, setCards] = useState([])
    const [collectionsDisplay, setCollectionsDisplay] = useState(false)
    const [collection, setCollection] = useState({
        name: '',
        description: '',
        img: ''
    })

    let user = props.user

    const loadCollections = () => {
        if (user) {
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

    useEffect(() => {
            loadCollections()
    }, []); 

    const handleChange = (event) => {
        setCollection({ ...collection, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try {
            let response = await fetch(`/api/v1/collections`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(collection)
            })

            if (response.ok) {
                console.log('collection added');
                setCollection({
                    name: '',
                    description: '',
                    img: ''
                });
                collectionsPopup()
                loadCollections()
            } else {
                console.log('collection could not be saved');
            }

        } catch (error) {
            console.log("error", error)
        }
    }

    const collectionsPopup = () => {
        setCollectionsDisplay(!collectionsDisplay)
    }

    const removeCollection = async (collectionID) => {
        let response = await fetch(`/api/v1/collections?collectionID=${collectionID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            loadCollections();
        } else {
            console.error('Failed to delete collection');
        }
    }

    return (
        <div>
            {/* user */}
            {user ? (
                <>
                    <div id="profile-info">
                        <h2>Welcome, {user.userInfo.name}</h2>
                        <hr />
                        <div className="profile-head">
                            <h3>Collections</h3>

                            <button onClick={collectionsPopup} className="medium-button">
                                Create Collection
                            </button>
                            {collectionsDisplay ? (
                                <>
                                    <div className="filter-overlay"></div>
                                    <div className="popup-container">
                                        <div className="popup-head">
                                            <h4>Create Collection</h4>
                                            <button className="remove-default" onClick={collectionsPopup}>
                                                <span className="fa fa-x"></span>
                                            </button>
                                        </div>
                                        <div className="form-div">
                                            <form onSubmit={handleSubmit}>
                                                <p>Collection Name:</p>
                                                <input
                                                    type="text"
                                                    id="collectionTitle"
                                                    className="form-input"
                                                    name="name"
                                                    value={collection.name}
                                                    onChange={handleChange}
                                                    placeholder="Enter collection name..."
                                                />
                                                <br />
                                                <p>Description:</p>
                                                <input
                                                    type="text"
                                                    id="collectionDescription"
                                                    className="form-input"
                                                    name="description"
                                                    value={collection.description}
                                                    onChange={handleChange}
                                                    placeholder="Describe your collection..."
                                                />
                                                <br />
                                                <p>Cover Image:</p>
                                                <input
                                                    type="text"
                                                    id="collectionCoverImg"
                                                    className=""
                                                    name="img"
                                                    value={collection.img}
                                                    onChange={handleChange}
                                                    placeholder="Enter an image URL..."
                                                />
                                                <br />
                                                <input type="submit" value="Submit" className="small-button submit-form"  />
                                            </form>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div class="collections">
                        <div className="collection-grid">
                            {cards.map((card) => (
                                <div key={card._id} className="collection-card">
                                    <Link to={`/collection/${card._id}`}>
                                        <img src={card.collection_img} alt={`cover for ${card.collection_name}`} />
                                        <h4>{card.collection_name}</h4>
                                    </Link>
                                    <button onClick={() => removeCollection(card._id)} className="small-button">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h2>Please log in to view your collections.</h2>
                </>
            )}
        </div>
    );
};

export default Profile;
