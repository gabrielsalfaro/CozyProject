import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { FaRegStar } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
import { createReview, fetchSingleSpotWithReviews } from '../../store/spots';
import './CreateNewReview.css';

function CreateNewReview({ spotId }) {
    // const spotId = useSelector(state => state.spots.singleSpot.id);
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [hover, setHover] = useState(0);
    // const [choice, setChoice] = useState();
    const [errors, setErrors] = useState({});

    const minReq = review.trim().length < 10 || (stars === 0 || stars === '');

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
            stars
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
                                {[1, 2, 3, 4, 5].map((starValue) => (
                                    <span
                                    key={starValue}
                                    className={`star-icon ${starValue <= (hover || stars) ? 'filled' : ''}`}
                                    onClick={() => setStars(starValue)}
                                    onMouseEnter={() => setHover(starValue)}
                                    onMouseLeave={() => setHover(0)}
                                    style={{ cursor: 'pointer', fontSize: '24px' }}
                                    >
                                    <FaRegStar />
                                    </span>
                                ))}
                                <span className="star-label">Stars</span>
                            </div>
                        </div>
                    </label>
                    <label>
                        <div className="eview-button-container">
                            <button 
                                className="review-button" 
                                disabled={minReq}
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