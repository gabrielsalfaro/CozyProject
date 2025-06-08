import { FaRegStar } from "react-icons/fa";
import CreateNewReview from "../CreateNewReview/CreateNewReview";
import OpenModalButton from '../OpenModalButton';
import React from 'react';
import { useSelector } from 'react-redux'
import './Reviews.css';

function Reviews({ reviews = [] }) {
  const sessionUser = useSelector(state => state.session.user);
  const host = useSelector(state => state.spots.singleSpot?.Owner?.id);
  const hasReviewed = reviews.some(review => review?.userId === sessionUser?.id)
  const averageStars =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(1)
      : null;

  // clg full redux state
  // const state = useSelector(state => state); 
  // const logState = () => {
  //   console.log('Full Redux state: ', JSON.stringify(state, null, 2));
  // };

  return (
    <>
    <div className="spot-reviews-container">
      {averageStars && (<>
        <p className="reviews-rating">
          <FaRegStar /> {averageStars} · {reviews.length} review{reviews.length > 1 ? 's' : ''}
        </p> 

        {/* double check (sessionUser != host) */}
        {sessionUser && (sessionUser != host) && (!hasReviewed) && (
          <OpenModalButton 
            buttonText='Post Your Review'
            className="review-create-review"
            modalComponent={<CreateNewReview />}
          >Post Your Review</OpenModalButton>
          
         )}
      </>)}
      
        {reviews.length === 0 ? (
          <p><FaRegStar /> New</p>
        ) : (
          reviews.map(review => {
            const date = new Date(review.createdAt);
            const monthYear = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long'
            });

            return (<React.Fragment key={review.id}>
              <div  className="review-card">
                <p className="reviews-first-name">{review.User.firstName}</p>
                <p className="reviews-date">{monthYear}</p>
                <p className="reviews-review">{review.review}</p>

                {review.ReviewImages?.length > 0 && (
                  <img
                    src={review.ReviewImages[0].url}
                    alt="Review image"
                    style={{ width: '200px', borderRadius: '8px' }}
                  />
                )}
              </div>
              <hr className="review-hr" />
            </React.Fragment>);
          })
        )}
      </div>
      {/* <button onClick={logState}> debug: state </button> */}
    </>
  );
}

export default Reviews;
