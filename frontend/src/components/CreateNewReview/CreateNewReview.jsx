import { useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { FaRegStar } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
import { createReview, fetchSingleSpotWithReviews } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './CreateNewReview.css';

function CreateNewReview() {
    const { spotId } = useParams(); // do we pass instead?
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReview] = useState('');
    // const [stars, setStars] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = {};

        if (!review.trim()) validation.review = 'Review is required';

        setErrors(validation);
        if (Object.keys(validation).length > 0) return;

        try {
        await dispatch(createReview({
            spotId,
            review,
            // stars
        }));

        await dispatch(fetchSingleSpotWithReviews(spotId));
        closeModal();
        } catch (res) {
        try {
            const data = await res.json();
            if (data?.errors) {
            setErrors(data.errors);
            }
        } catch (err) {
            console.error('Unexpected error parsing response:', err);
        }
        }
    };

    

    return(<>
        <div className="modal-container" onClick={() => closeModal()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h1 className='modal-title'>How was your stay?</h1>
                {errors.latitude && <span className="error-text">{errors.latitude}</span>}
                <form onSubmit={handleSubmit} className="review-form">
                    <label>
                        <textarea
                            className="review-textarea"
                            placeholder="Leave your review here..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                    </label>
                    <label>
                        <div className="review-rating">
                            <div className="stars">
                                <span><center>
                                    
                                <FaRegStar />
                                <FaRegStar />
                                <FaRegStar />
                                <FaRegStar />
                                    {/* if clicked, set this and previous stars to filled class */}
                                <FaRegStar />
                                 Stars</center></span>
                            </div>
                        </div>
                    </label>
                    <label>
                        <div className="eview-button-container">
                            <button 
                                className="review-button" 
                                onClick={() => console.log('clicked')}>Submit Your Review
                            </button>
                        </div>
                    </label>
                </form>

            </div>
        </div>
    </>
    )
}

export default CreateNewReview;