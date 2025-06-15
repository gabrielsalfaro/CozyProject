import { useDispatch } from 'react-redux';
import { deleteReview, deleteSpot, deleteSpotImage } from '../../store/spots';
import { useModal } from '../../context/Modal';
import './ConfirmDeleteModal.css';

function ConfirmDeleteModal({ 
  spotId, 
  reviewId, 
  itemType = 'spot', 
  onConfirm, 
  refreshSpots 
}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    try {
      if (itemType === 'review' && reviewId) {
        await dispatch(deleteReview(reviewId));
        if (onConfirm) onConfirm(); 
        closeModal();
        return;
      }

      // ---- SPOT deletion flow ---- //
      // 1. Delete reviews
      const reviewsRes = await fetch(`/api/spots/${spotId}/reviews`);
      const reviewsData = await reviewsRes.json();

      if (reviewsRes.ok && Array.isArray(reviewsData.Reviews)) {
        for (const review of reviewsData.Reviews) {
          await dispatch(deleteReview(review.id));
        }
      }

      // 2. Delete spot images
      // check image logic in CreateNewSpot
      const spotRes = await fetch(`/api/spots/${spotId}`);
      const spot = await spotRes.json();

      if (spot.SpotImages?.length) {
        for (const image of spot.SpotImages) {
          await dispatch(deleteSpotImage(image.id));
        }
      }

      // do we need bookings too? is this causing the constraint issues?
      // const bookingsRes = await fetch(`/api/spots/${spotId}/bookings`); // check route
      // if (bookingsRes.ok) {
      //   const { Bookings } = await bookingsRes.json();
      //   for (const booking of Bookings) {
      //     await dispatch(deleteBooking(booking.id));
      //   }
      // }

      await dispatch(deleteSpot(spotId));
      if (refreshSpots) await refreshSpots();
      closeModal();

    } catch (err) {
      console.error("Delete failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const isReview = itemType === 'review';

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className='modal-title'>Confirm Delete</h2>
        <center>
          <p>
            Are you sure you want to delete this {isReview ? 'review' : 'spot'}?
          </p>
        </center>
        
        <div className="modal-buttons">
          <button className="confirm-delete" onClick={handleDelete}>
            Yes (Delete {isReview ? 'Review' : 'Spot'})
          </button>
          <button className="cancel-delete" onClick={closeModal}>
            No (Keep {isReview ? 'Review' : 'Spot'})
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
