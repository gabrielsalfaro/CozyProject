import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { FaRegStar } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
import './CreateNewReview.css';

function CreateNewReview() {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    // const [stars, setStars] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(
        sessionActions.createReview({
            review,
            // stars
        })
        )
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data?.errors) {
            setErrors(data.errors);
            console.log(errors);
            }
        });
    };
    

    return(<>
        <div className="modal-container" onClick={() => closeModal()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h1>How was your stay?</h1>
                <form onSubmit={handleSubmit} className="create-review-form">
                    <label>
                        <textarea
                            className="review-description"
                            placeholder="Leave your review here..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                    </label>
                    <label>
                        <div className="review-rating">
                            <div className="stars">
                                <span>
                                <FaRegStar />
                                <FaRegStar />
                                <FaRegStar />
                                <FaRegStar />
                                <FaRegStar />
                                 Stars</span>
                            </div>
                        </div>
                    </label>
                    <label>
                        <div className="new-review-button-container">
                            <button 
                                className="new-review-submit" 
                                onClick={handleSubmit}>Submit Your Review
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