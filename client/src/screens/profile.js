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
    };    

    useEffect(() => {
        if (user) {
            loadCollections()
        }
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
            {user ? (
                <div>
                    <div className="profile">
                        <h2>{user.name}</h2>
                        <hr />
                        <div className="profile-head">
                            <h3>Collections</h3>

                            <button onClick={collectionsPopup} className="collection-button">
                                Create Collection
                            </button>
                            {collectionsDisplay ? (
                                <>
                                    <div className="filter-overlay"></div>
                                    <div className="create-collections-popup">
                                        <div className="popup-head">
                                            <h4>Create Collection</h4>
                                            <button onClick={collectionsPopup}>
                                                <span className="fa fa-minus"></span>
                                            </button>
                                        </div>
                                        <div className="collection-add-info">
                                            <form onSubmit={handleSubmit}>
                                                <label htmlFor="collectionTitle">Collection Name:</label><br />
                                                <input
                                                    type="text"
                                                    id="collectionTitle"
                                                    name="name"
                                                    value={collection.name}
                                                    onChange={handleChange}
                                                />
                                                <br />
                                                <label htmlFor="collectionDescription">Description:</label><br />
                                                <input
                                                    type="text"
                                                    id="collectionDescription"
                                                    name="description"
                                                    value={collection.description}
                                                    onChange={handleChange}
                                                />
                                                <br />
                                                <label htmlFor="collectionCoverImg">Cover Image:</label><br />
                                                <input
                                                    type="text"
                                                    id="collectionCoverImg"
                                                    name="img"
                                                    value={collection.img}
                                                    onChange={handleChange}
                                                />
                                                <br />
                                                <input type="submit" value="Submit" />
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
                                <div key={card._id} class="collection-card">
                                    <Link to={`/collection/${card._id}`}>
                                        <img src={card.collection_img} alt={`cover for ${card.collection_name}`} />
                                        <h4>{card.collection_name}</h4>
                                    </Link>
                                    <button onClick={() => removeCollection(card._id)} class="collection-button">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Please log in to view your collections.</h2>
                </div>
            )}
        </div>
    );
};

export default Profile;
