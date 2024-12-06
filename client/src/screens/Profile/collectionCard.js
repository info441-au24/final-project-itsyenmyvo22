import React from 'react';
import { Link } from 'react-router-dom';

const CollectionCard = (props) => {
    let collection = props.collection
    let renderCollectionsCallback = props.render

    const renderCollections = () => {
        renderCollectionsCallback()
    }

    const removeCollection = async () => {
        try {
            let response = await fetch(`/api/v1/collections?collectionID=${collection._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
            })
            if (response.ok) {
                renderCollections();
            } else {
                throw new Error('Failed to delete collection');
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Whoops! Your collection could not be deleted.")
        }
        
    }

    return (
        <div key={collection._id} className="collection-card">
            <Link to={`/collection/${collection._id}`}>
                <img src={collection.collection_img} alt={`cover for ${collection.collection_name}`} />
                <h4>{collection.collection_name}</h4>
            </Link>
            <button onClick={() => removeCollection()} className="small-button">Delete</button>
        </div>
    )
}

export default CollectionCard;
