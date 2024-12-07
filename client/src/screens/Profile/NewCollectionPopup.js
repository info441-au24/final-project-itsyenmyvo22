import React, { useState } from 'react';

const NewCollectionPopup = (props) => {
    const [collection, setCollection] = useState({
        name: '',
        description: '',
        img: ''
    })

    let togglePopupCallback = props.callback
    let renderCollectionsCallback = props.render

    const renderCollections = () => {
        renderCollectionsCallback()
    }

    const handleChange = (event) => {
        setCollection({ ...collection, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!collection.name || !collection.description || !collection.img) {
            alert("You must fill out all fields!")
        } else {
            try {
            const response = await fetch(`/api/v1/collections`, {
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
                closeCollectionsPopup()
                renderCollections()
            } else {
                throw new Error('Collection could not be saved');
            }

            } catch (error) {
                console.error('Error:', error);
                alert("Whoops! Your collection could not be saved.")
            }
        }
        
    }

    const closeCollectionsPopup = () => {
        togglePopupCallback()
    }

    return (
        <>
        <div className="filter-overlay"></div>
            <div className="popup-container">
                <div className="popup-head">
                    <h4>Create Collection</h4>
                    <button className="remove-default" onClick={closeCollectionsPopup}>
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
                            className="form-input"
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
    )

}

export default NewCollectionPopup;
