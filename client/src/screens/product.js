import React from 'react';
import { Link } from 'react-router-dom';

const Product = () => {
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
                        <button>Add to Collection</button>
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
                    <hr />
                </div>
                
            </div>
            <div id="product-reviews">
                <div class="product-reviews-head">
                    <h3>### REVIEWS</h3>
                    <button>Filter</button>
                </div>
                <button>Write a Review</button>
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
                            <p>This is the review text. Could either be short or long. The show more button would be used if a review is quite long.</p>
                            <button>Read more</button>
                        </div>

                        <div class="review-btns">
                            <div>
                                <i class="fa fa-regular fa-thumbs-up"></i>
                                <i class="fa fa-regular fa-reply"></i>
                            </div>
                        
                           {/* render view/hide only if there are replies */}
                        <button>Show/Hide Replies (###)</button> 
                        </div>

                            {/* comments */}
                            <div class="comments">
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
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Product;