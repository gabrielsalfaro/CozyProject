import { FaRegStar } from "react-icons/fa";
import CreateNewReview from "../CreateNewReview/CreateNewReview";
import OpenModalButton from '../OpenModalButton';
// import React from 'react';
import { useSelector } from 'react-redux'
import './Reviews.css';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/spots';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';

function Reviews({ reviews = [] }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots.singleSpot);
  const hostId = spot?.Owner?.id;
  const spotId = spot?.id;

  const hasReviewed = reviews.some(review => review?.userId === sessionUser?.id);
  const averageStars =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="spot-reviews-container">
      {averageStars ? (
        <p className="reviews-rating">
          <FaRegStar /> {averageStars} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </p>
      ) : (
        <p><FaRegStar /> New</p>
      )}

      {sessionUser && sessionUser.id !== hostId && !hasReviewed && (
        <OpenModalButton
          buttonText="Post Your Review"
          className="review-create-review"
          modalComponent={<CreateNewReview spotId={spotId} />}
        />
      )}

      {reviews.map(review => {
        const date = new Date(review.createdAt);
        const monthYear = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        });

        const isReviewAuthor = sessionUser?.id === review.userId;

        return (
          <div className="review-card" key={review.id}>
            <p className="reviews-first-name">{review.User?.firstName || 'Anonymous'}</p>
            <p className="reviews-date">{monthYear}</p>
            <p className="reviews-review">{review.review}</p>

            {review.ReviewImages?.[0]?.url && (
              <img
                src={review.ReviewImages[0].url}
                alt="Review"
                className="review-image"
              />
            )}

            {isReviewAuthor && (
              <div className="delete-review-button-container">
              <OpenModalButton
                buttonText="Delete Review"
                className="delete-review-button"
                modalComponent={
                  <ConfirmDeleteModal
                    reviewId={review.id}
                    itemType="review"
                    onConfirm={() => dispatch(deleteReview(review.id))}
                  />
                }
              />
              </div>
              
            )}
            <hr className="review-hr" />
          </div>
        );
      })}
    </div>
  );
}

export default Reviews;
