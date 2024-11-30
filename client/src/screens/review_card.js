import React, {useEffect, useState} from 'react';
/* import { useParams } from 'react-router-dom';*/
import Loader from './loader';

const Comment = (props) => {
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [commentData, setCommentData] = useState({username: "test-acc"});
    let comment = props.comment

    const loadComment =  async () => {
        setIsDataLoading(true);
        console.log("about to make fetch data about comment with ID:", comment)
        await fetch(`/api/v1/reviews/comments?commentID=${comment}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data) {setCommentData(data)};
                setIsDataLoading(false);
            })
            .catch((error) => console.error('Error loading reviews:', error))
    }

    useEffect(() => {
        loadComment()
    }, [])

    return (
        <>
        {isDataLoading ? <></> : <div className="comment">

            <div className="comment-head">
                <h4>{commentData.username}</h4>
                <p className="date">{commentData.created_date}</p>
            </div>

            <div className="comment-body">
                <p>{commentData.comment}</p>
            </div>

        </div>}
        </>
    )
    
}

const ReviewCard = (props) => {
    let review = props.review;
    let comments = review.comments;
    let reloadReviews = props.callback;
    const [commentsDisplay, setCommentsDisplay] = useState(false);
    const [liked, setLiked] = useState(false);
    const [reviewText, setReviewText] = useState(false);
    const [newComment, setNewComment] = useState({username: "test-acc"});

    const toggleComments = () => {
        setCommentsDisplay(!commentsDisplay)
    }
    const toggleLike = () => {
        setLiked(!liked)
    }
    const toggleReadMore = () => {
        setReviewText(!reviewText)
    }

    const handleCommentChange = async (e) => {
        setNewComment({...newComment, [e.target.name]: e.target.value})
    };

    const submitComment = async (e) => {
        e.preventDefault();
        reloadReviews();
        try {
            const response = await fetch(`/api/v1/reviews/comments?reviewID=${review._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment)
            });
    
            if (response.ok) {
                console.log('review uploaded successfully');
                setNewComment({ username: 'test-acc '}); // Reset form
            } else {
                console.error('Failed to submit review');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };  

    return (
        <div className='review'>
            {/* review body */}
            <div className="review-head">
                <h4>{review.username}</h4>
                <p className="date">{review.created_date}</p>
            </div>
                    
            <div className="rating"> 
                <i className="fa fa-star clicked"></i> 
                <i className="fa fa-star clicked"></i> 
                <i className="fa fa-star clicked"></i> 
                <i className="fa fa-star clicked"></i> 
                <i className="fa fa-star"></i> 
            </div> 

            <div className="review-text">
                {reviewText ? 
                <p>{review.review}<button onClick={toggleReadMore}>Show less</button></p>
                :
                <p>This is the review text. Could either be short or long. The show more button would be used...<button onClick={toggleReadMore}>Show more</button></p>}
            </div>

            <div className="review-btns">
                <div className="helpful">
                    <p>Helpful?</p>
                    <button className="like-btn" onClick={toggleLike}>
                        <div>
                            
                            {liked ? 
                            <>
                            <i className="fa fa-thumbs-up" style={{color: 'black'}}></i>
                            <span>1</span>
                            </>
                            : 
                            <><i className="fa fa-thumbs-up" style={{color:'lightgray'}}></i>
                            <span>0</span></>
                            }
                            </div>
                    </button>
                </div>
                
            
                {/* render view/hide only if there are replies */}
            
                <button className="comments-toggle" onClick={toggleComments}>{commentsDisplay ? "Hide" : "Show"} Replies</button>
            </div>

            {/* comments */}
            {commentsDisplay ? 
                <div className="comments">
                    {comments.map((comment) => <Comment key={comment._id} comment={comment}/>)}
                    <div className="reply-box">
                        <input
                                type="text"
                                id="comment-input"
                                placeholder="Add a comment"
                                name="comment"
                                value={newComment.comment}
                                onChange={handleCommentChange}
                            />
                        <button onClick={submitComment}>Submit</button>
                    </div>
                </div>
                : 
                <></>}  
            </div>
    )
}

export default ReviewCard;