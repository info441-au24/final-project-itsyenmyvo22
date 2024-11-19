import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Product = () => {
    const [commentsDisplay, setCommentsDisplay] = useState(false);
    const [liked, setLiked] = useState(false);
    const [reviewText, setReviewText] = useState(false);
    const [filterDisplay, setFilterDisplay] = useState(false);
    const [collectionsDisplay, setCollectionsDisplay] = useState(false)
    const [addReviewDisplay, setAddReviewDisplay] = useState(false)

    const toggleComments = () => {
        setCommentsDisplay(!commentsDisplay)
    }
    const toggleLike = () => {
        setLiked(!liked)
    }
    const toggleReadMore = () => {
        setReviewText(!reviewText)
    }
    const filterPopup = () => {
        setFilterDisplay(!filterDisplay)
    }
    const collectionsPopup = () => {
        setCollectionsDisplay(!collectionsDisplay)
    }

    const addReviewPopup = () => {
        setAddReviewDisplay(!addReviewDisplay)
    }
    /* 
    
    will need to fetch:
    review data
    comments data
    whether user has liked a review
    user's collections

    On load:

    - Using review data (an array of review objects),
    use mapping to parse review data. if array is empty, do not parse
    and use empty tags.

    - Reviews will also be parsed for if a user has liked a review
    (meaning they are in the likes array)

    Otherwise:

    - Collections will be fetched only if user clicks add to collection, should be cached after
    Parse collections for whether item has already been added and show which collections already have the item.
    
    - Comments will be fetched only if user clicks toggle on replies, should
    only be rendered once and then basically cached.

    POSTs:

    - Add product to collection: user must pick either a default collection (wishlist) or another collection
    - Write a review: select existing tags, dropdown rating, review text

     */



    /* determined by user so implement persistence later */
    return (
        <div>
            <div class="product-container">

                <div class="product-col product-img">
                        <img src="https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v4/moisturizing-cream/cerave_moisturizing_cream_16oz_jar_front-700x875-v4.jpg?rev=db6e3c22250e4928bc749dd2c207de5b&w=500&hash=D85F888749CB3F9C74FBBBF73EFA6D40" alt="product"></img>
                </div>

                <div class="product-col product-info">

                    <div class="product-head">
                        <h2>Product Name</h2>
                        <p>Product Category</p>
                        <p>Brand Name</p>
                    </div>

                    <hr/>

                    <div class="product-tags">
                        <span>Normal Skin</span>
                        <span>Ceramides</span>
                        <span>Moisturizing</span>
                    </div>

                    <hr />

                    <div class="product-descr">
                        <h3>DESCRIPTION</h3>
                        <p>This is the product description. Might look something like: CeraVe Moisturizing Cream is a rich, non-greasy, fast-absorbing moisturizer with three essential ceramides that lock in skin's moisture and help maintain the skin's protective barrier. Word Count Limit?</p>
                    </div>

                    <button onClick={collectionsPopup} id="add-to-collection">Add to Collection <span class="fa fa-angle-down down-arrow"></span></button>
                    {collectionsDisplay ? 
                    <>
                    <div class="filter-overlay"></div>
                    <div class="collections-popup">
                        <div class="popup-head">
                            <h4>Add to collection</h4>
                            <button onClick={collectionsPopup}><span class="fa fa-minus"></span></button>
                        </div>
                            <div class="collection">
                                <img src="https://i.pinimg.com/236x/97/69/da/9769da3ec35c566c9aeb4356afab1010.jpg"></img>
                                <p>Wishlist</p>
                            </div>
                            <div class="collection">
                                <img src="https://i.pinimg.com/236x/97/69/da/9769da3ec35c566c9aeb4356afab1010.jpg"></img>
                                <p>Daily Routine</p>
                            </div>
                            <div class="collection">
                                <img src="https://i.pinimg.com/236x/97/69/da/9769da3ec35c566c9aeb4356afab1010.jpg"></img>
                                <p>Favorites</p>
                            </div>
                    </div> 
                    </>
                    : 
                    <></>

                    }

                    <button onClick={addReviewPopup} class="add-review">Write a Review</button>
                    {addReviewDisplay ? 
                    <>
                    <div class="filter-overlay"></div>
                    <div class="add-review-popup">
                        <div class="popup-head">
                            <h4>Write a review</h4>
                            <button onClick={addReviewPopup}><span class="fa fa-minus"></span></button>
                        </div>
                        <form id="add-review">
                            <p>Rating</p>
                            <select class="form-select" aria-label='Choose rating'>
                                <option selected></option>
                                <option value="Skin Care">1</option>
                                <option value="Hair Care">2</option>
                                <option value="Not Listed">3</option>
                                <option value="Skin Care">4</option>
                                <option value="Hair Care">5</option>
                            </select>
                            <p>What did you think about this product?</p>
                            <textarea name="newReviewContent" rows={4}/>
                            <button>Submit</button>
                        </form>
                    </div> 
                    </>
                    : 
                    <></>

                    }
                    <hr />
                </div>
                
            </div>
            <div id="product-reviews">
                <div class="product-reviews-head">
                    <h3>### REVIEWS</h3>
                    <button onClick={filterPopup}>Filter</button>
                    {filterDisplay ? 
                    <>
                    <div class="filter-overlay"></div>
                    <div class="filter-popup">
                        <div class="popup-head">
                            <h4>Sort by</h4>
                            <button onClick={filterPopup}><span class="fa fa-minus"></span></button>
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
                    <div class='review'>
                    {/* review body */}
                        <div class="review-head">
                            <h4>Reviewer</h4>
                            <p class="date">November 17, 2025</p>
                        </div>

                        <div class="rating"> 
                                <i class="fa fa-star clicked"></i> 
                                <i class="fa fa-star clicked"></i> 
                                <i class="fa fa-star clicked"></i> 
                                <i class="fa fa-star clicked"></i> 
                                <i class="fa fa-star"></i> 
                        </div> 
                        
                        <div class="review-text">
                            {reviewText ? 
                            <p>This is the review text. Could either be short or long. The show more button would be used if the review is quite long.<button onClick={toggleReadMore}>Show less</button></p>
                            :
                            <p>This is the review text. Could either be short or long. The show more button would be used...<button onClick={toggleReadMore}>Show more</button></p>
                            }
                            
                        </div>

                        <div class="review-btns">
                            <div class="helpful">
                                <p>Helpful?</p>
                                <button class="like-btn" onClick={toggleLike}>
                                    <div>
                                        
                                        {liked ? 
                                        <>
                                        <i class="fa fa-thumbs-up" style={{color: 'black'}}></i>
                                        <span>1</span>
                                        </>
                                        : 
                                        <><i class="fa fa-thumbs-up" style={{color:'lightgray'}}></i>
                                        <span>0</span></>
                                        }
                                        </div>
                                </button>
                            </div>
                            
                        
                           {/* render view/hide only if there are replies */}
                        
                        <button class="comments-toggle" onClick={toggleComments}>Show/Hide Replies</button>
                        </div>

                            {/* comments */}

                            {commentsDisplay ? 
                            <div id="comments">
                                <div class="comment">

                                    <div class="comment-head">
                                        <h4>Commenter</h4>
                                        <p class="date">November 17, 2025</p>
                                    </div>

                                    <div class="comment-body">
                                        <p>This is the comment text.</p>
                                    </div>

                                </div>
                            
                                <div class="comment">
                                    <div class="comment-head">
                                        <h4>Commenter</h4>
                                        <p class="date">November 17, 2025</p>
                            
                                    </div>
                                    <div class="comment-body">
                                        <p>This is the comment text.</p>
                                    </div>
                                    
                                </div>
                                <div class="reply-box">
                                    <input
                                            type="text"
                                            id="comment-input"
                                            placeholder="Add a comment"
                                        />
                                    <button>Submit</button>
                                </div>
                            </div>
                            : 
                            <></>}
                    
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Product;