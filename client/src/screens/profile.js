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
    let name = props.user.name
    let { username } = useParams()

    const loadCollections = () => {
        //to update username later
        // const apiUrl = process.env.REACT_APP_API_URL; // Use the API URL from environment variables
        //fetch(`${apiUrl}/api/profile?username=test-acc`)
        fetch(`/api/v1/collections?username=${username}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setCards(data);
            })
            .catch((error) => {
                console.error('Error loading collections:', error);
            });
    }    

    useEffect(() => {
        const loadCollections = () => {
            //to update username later
            // const apiUrl = process.env.REACT_APP_API_URL; // Use the API URL from environment variables
            //fetch(`${apiUrl}/api/profile?username=test-acc`)
            fetch(`/api/v1/collections?username=${username}`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setCards(data);
                })
                .catch((error) => {
                    console.error('Error loading collections:', error);
                });
        };    
        loadCollections()
    }, [name, username]);

    const handleChange = (event) => {
        setCollection({ ...collection, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // const apiUrl = process.env.REACT_APP_API_URL; // Use the API URL from environment variables
        try {
            //let response = await fetch(`${apiUrl}/api/profile`, {
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
                console.log('collection failed');
            }
    
        } catch (error) {
            console.log("error", error)
        }
    }    

    const collectionsPopup = () => {
        setCollectionsDisplay(!collectionsDisplay)
    }

    return (
        <div>
            <div class="profile">
                <h2>{name}</h2>
                <hr></hr>
                <div class="profile-head">
                    <h3>Collections</h3>

                    <button onClick={collectionsPopup} class="collection-button">Create Collection</button>
                    {collectionsDisplay ?
                        <>
                            <div class="filter-overlay"></div>
                            <div class="create-collections-popup">
                                <div class="popup-head">
                                    <h4>Create Collection</h4>
                                    <button onClick={collectionsPopup}><span class="fa fa-minus"></span></button>
                                </div>
                                <div class="collection-add-info">
                                    <form onSubmit={handleSubmit}>
                                        <label for="collectionTitle">Collection Name:</label><br></br>
                                        <input type="text" id="collectionTitle" name="name" value={collection.name} onChange={handleChange}></input><br></br>
                                        <label for="collectionDescription">Description:</label><br></br>
                                        <input type="text" id="collectionDescription" name="description" value={collection.description} onChange={handleChange}></input><br></br>
                                        <label for="collectionDescription">Cover Image:</label><br></br>
                                        <input type="text" id="collectionCoverImg" name="img" value={collection.img} onChange={handleChange}></input><br></br>
                                        <input type="submit" value="Submit"></input>
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
                <div className="collection-grid">
                    {cards.map((card) => (
                        <div class="collection-card">
                            <Link to="/collection">
                                <img src={card.collection_img} alt={`cover for ${card.collection_name}`}/>
                                <h4>{card.collection_name}</h4>
                            </Link>
                            <button class="collection-button">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
