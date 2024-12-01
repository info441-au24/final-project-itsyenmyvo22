import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from './reviewCard';
import CollectionsPopup from './collectionsPopup';
import ReviewPopup from './reviewPopup';

const Product = () => {
    const [isDataLoading, setIsDataLoading] = useState(false);

    const [productInfo, setProductInfo] = useState({})
    
    const [showCollectionsPopup, setShowCollectionsPopup] = useState(false);
    const [showReviewPopup, setShowReviewPopup] = useState(false)

    const [filterDisplay, setFilterDisplay] = useState(false);
    
    /* const [newReview, setNewReview] = useState({username: "test-acc", rating: "", review: ""}); */
    const [reviews, setReviews] = useState([]);
    const { productID } = useParams()

    const filterPopup = () => {
        setFilterDisplay(!filterDisplay)
    }


    const loadProductInfo = async () => {
        //const apiUrl = process.env.REACT_APP_API_URL; // Use the API URL from environment variables
        //const apiUrl = 'http://localhost:3001'
        setIsDataLoading(true);
        await fetch(`/api/v1/posts?productID=${productID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProductInfo(data);
                setIsDataLoading(false);
            })
            .catch((error) => console.error('Error loading product info:', error));

    }  

    const loadReviews =  async () => {
        await fetch(`/api/v1/reviews?productID=${productID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
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

        
    /* 
    
    will need to fetch:
    whether user has liked a review

    On load:

    - Using review data (an array of review objects),
    use mapping to parse review data. if array is empty, do not parse
    and use empty tags.

    - Reviews will also be parsed for if a user has liked a review
    (meaning they are in the likes array)

    Otherwise:
    
    - Comments will be fetched only if user clicks toggle on replies, should
    only be rendered once and then basically cached.

    POSTs:
    - Write a review: select existing tags, dropdown rating, review text

     */



    /* determined by user so implement persistence later */
    return (
        <div>
            {isDataLoading ? <></> : 
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

                

                {/* <hr/>
                <div className="product-tags">
                    <span>Normal Skin</span>
                    <span>Ceramides</span>
                    <span>Moisturizing</span>
                </div>

                <hr /> */}

                {/* <div className="product-descr">
                    <h3>DESCRIPTION</h3>
                    <p>This is the product description. Might look something like: CeraVe Moisturizing Cream is a rich, non-greasy, fast-absorbing moisturizer with three essential ceramides that lock in skin's moisture and help maintain the skin's protective barrier. Word Count Limit?</p>
                </div> */}

                <button onClick={() => setShowCollectionsPopup(!showCollectionsPopup)} id="add-to-collection">Add to Collection <span className="fa fa-angle-down down-arrow"></span></button>
                
                {showCollectionsPopup ? <CollectionsPopup productID={productID} callback={() => {setShowCollectionsPopup(!showCollectionsPopup)}}/> : <></>}
                
                <hr />

                {showReviewPopup ? <ReviewPopup productID={productID} callback={() => {setShowReviewPopup(!showReviewPopup)}} render={() => loadReviews()}/> : <></>}
            
            </div>
            
        </div>
        <div id="product-reviews">
            <div className="product-reviews-head">
                <h3 id="reviews-heading">REVIEWS ({reviews.length})</h3>
                <button onClick={() => setShowReviewPopup(!showReviewPopup)} id="add-review-button">Write a Review</button>
                {/* <button onClick={filterPopup} id="sort-reviews">Sort</button> */}
                {filterDisplay ? 
                <>
                <div className="filter-overlay"></div>
                <div className="filter-popup">
                    <div className="popup-head">
                        <h4>Sort by</h4>
                        <button onClick={filterPopup}><span className="fa fa-minus"></span></button>
                    </div>
                        
                        <p>Most Recent</p>
                        <p>Highest Rated</p>
                        <p>Lowest Rated</p>
                        <p>Most Helpful</p>
                </div> 
                </>
                : 
                <></>

                }
            </div>
            {/* reviews should be handled in a separate component */}
            <div id='reviews'>
                {isDataLoading ? <></> : reviews.map((review) => <ReviewCard key={review._id} review={review} render={() => loadReviews()}/>)}     
            </div>
        </div>
    </>
            }
              </div>
    );
};

export default Product;