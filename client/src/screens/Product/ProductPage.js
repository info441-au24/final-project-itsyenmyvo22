import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from './Review';
import CollectionsPopup from './AddToCollectionsPopup';
import NewReviewPopup from './NewReviewPopup';

const Product = (props) => {
    const [isDataLoading, setIsDataLoading] = useState(false);

    const [productInfo, setProductInfo] = useState({})
    
    const [showCollectionsPopup, setShowCollectionsPopup] = useState(false);
    const [showReviewPopup, setShowReviewPopup] = useState(false)
   
    const [reviews, setReviews] = useState([]);
    const { productID } = useParams()
    let user = props.user ? props.user : {status: "loggedout"}

    const loadProductInfo = async () => {
        setIsDataLoading(true);
        await fetch(`/api/v1/posts?productID=${productID}`)
            .then((res) => res.json())
            .then((data) => {
                setProductInfo(data);
                setIsDataLoading(false);
            })
            .catch((error) => console.error('Error loading product info:', error));

    }  

    const loadReviews =  async () => {
        await fetch(`/api/v1/reviews?productID=${productID}`)
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => console.error('Error loading reviews:', error))
    }

    useEffect(() => {
        loadProductInfo()
    }, []);

    useEffect(() => {
        loadReviews()
    }, []);

    return (
        <div>
            {!isDataLoading && 
            <>
            <div id="product-info-container">

            <div className="product-col product-img">
                    <img src={productInfo.url} alt="product"></img>
            </div>

            <div className="product-col product-info">

                <div className="product-head">
                    <h2 id="product-name">{productInfo.name}</h2>
                    <p id="product-category">{productInfo.category}</p>
                    <p id="product-price">{productInfo.price}</p>
                </div>

                {user.status === "loggedin" && 
                <button onClick={() => setShowCollectionsPopup(!showCollectionsPopup)} id="add-to-collection" className="medium-button">Add to Collection <span className="fa fa-angle-down down-arrow"></span></button>}
                
                
                
                
                <hr /> 
            
            </div>
            {showCollectionsPopup ? <CollectionsPopup productID={productID} callback={() => {setShowCollectionsPopup(!showCollectionsPopup)}}/> : <></>}
                {showReviewPopup ? <NewReviewPopup productID={productID} callback={() => {setShowReviewPopup(!showReviewPopup)}} render={() => loadReviews()}/> : <></>}
            
        </div>
        <div id="product-reviews">
            <div className="product-reviews-head">
                <h3 id="reviews-heading">REVIEWS ({reviews.length})</h3>
                {user.status === "loggedin" && <button onClick={() => setShowReviewPopup(!showReviewPopup)} id="add-review-button" className="medium-button">Write a Review</button>}
                
            </div>
            {/* reviews should be handled in a separate component */}
            <div id='reviews'>
                {isDataLoading ? <></> : reviews.map((review) => <ReviewCard key={review._id} review={review} user={user} render={() => loadReviews()}/>)}     
            </div>
        </div>
    </>
            }
              </div>
    );
};

export default Product;