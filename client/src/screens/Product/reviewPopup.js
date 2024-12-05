import React, {useState} from 'react';

const ReviewPopup = (props) => {
    const [newReview, setNewReview] = useState({username: "test-acc", rating: "", review: ""});
    let productID = props.productID
    let toggleReviewPopup = props.callback
    let renderReviewsCallback = props.render

    const closeReviewPopup = () => {
        toggleReviewPopup()
    }

    const handleReviewChange = (e) => {
        setNewReview({...newReview, [e.target.name]: e.target.value})
    };

    const renderReviews = () => {
        renderReviewsCallback()
    }

    const submitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/reviews?productID=${productID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview)
            });
    
            if (response.ok) {
                console.log('review uploaded successfully');
                setNewReview({ username: 'test-acc', rating: '', review: ''}); // Reset form
                closeReviewPopup();
                renderReviews();
            } else {
                console.error('Failed to submit review');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };  

    return (
        <>
        <div className="filter-overlay"></div>

        <div className="add-review-popup">
            <div className="popup-head">
                <h4>Write a review</h4>
                <button onClick={closeReviewPopup}><span className="fa fa-minus"></span></button>
            </div>
            <form id="add-review" onSubmit={submitReview}>
                <p>Rating</p>
                <select className="form-select" name="rating" value={newReview.rating} onChange={handleReviewChange} aria-label='Choose rating'>
                    <option selected></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <p>What did you think about this product?</p>
                <textarea rows={4} name="review" value={newReview.review} onChange={handleReviewChange}/>
                <button type="submit">Submit</button>
            </form>
        </div> 
        </>
    )
    
}

export default ReviewPopup;