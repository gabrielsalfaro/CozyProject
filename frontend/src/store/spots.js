import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SINGLE_SPOT = 'spots/LOAD_SINGLE_SPOT';
const ADD_SPOT = 'spots/ADD_SPOT';
const ADD_REVIEW = 'spots/ADD_REVIEW';
const DELETE_REVIEW = 'spots/DELETE_REVIEW';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const UPDATE_SPOT = 'spot/UPDATE_SPOT';

const initialState = {
  allSpots: {},      // <Home />
  singleSpot: {},  // <SpotDetails />
};

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
});

export const loadSingleSpot = (singleSpot) => ({
  type: LOAD_SINGLE_SPOT,
  singleSpot
})

export const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot
})

export const addReview = (review) => ({
  type: ADD_REVIEW,
  review
});

export const removeReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
});

export const removeSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId
})

export const updateSpotAction = (spot) => ({
  type: UPDATE_SPOT,
  spot
})

// /api/spots fetch
export const fetchSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots');
    if (res.ok) {
      const data = await res.json();
      dispatch(loadSpots(data.Spots)); // action: loadSpots
      // console.log('>>> ', { type: 'LOAD_SPOTS', spots: data.Spots });
    }
};

// /spots/:spotId fetch
// export const fetchSingleSpot = (spotId) => async (dispatch) => {
//   const res = await fetch(`/api/spots/${spotId}`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSingleSpot(data));
//     // console.log('>>> ', { type: 'LOAD_SINGLE_SPOT', singleSpot: data });
//   }
// };

// /api/spots/:spotId/review fetch
export const fetchSingleSpotWithReviews = (spotId) => async (dispatch) => {
  const spotRes = await fetch(`/api/spots/${spotId}`);
  let reviewsData = { Reviews: [] };

  const reviewsRes = await fetch(`/api/spots/${spotId}/reviews`);
  if (reviewsRes.ok) {
    reviewsData = await reviewsRes.json();
  } else if (reviewsRes.status === 404) {
    reviewsData = { Reviews: [] };
  }

  if (spotRes.ok) {
    const spotData = await spotRes.json();
    // console.log('reviewsData: ', reviewsData)
    spotData.Reviews = reviewsData.Reviews || []; // we [] if no reviews
    dispatch(loadSingleSpot(spotData));
  }
};

// /api/spots - CreateNewSpot
export const createSpot = (spotData) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spotData),
  });

  if (!response.ok) {
    const err = await response.json();
    throw err;
  }

  const newSpot = await response.json();

  // set preview image
  if (spotData.previewImage) {
    const imgRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: spotData.previewImage,
        preview: true,
      }),
    });

    if (imgRes.ok) {
      const image = await imgRes.json();
      newSpot.previewImage = image.url; // set the url to preview
    }
  }

  dispatch(addSpot(newSpot));
  return newSpot;
};

// /api/spots/${spotId}/reviews - Create a Review
export const createReview = ({ spotId, review, stars }) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ review, stars })
  });

  if (!res.ok) throw res;

  const data = await res.json();

  // ensure ReviewImages is set to an empty array on new reviews
  data.ReviewImages = data.ReviewImages || [];

  dispatch(addReview(data)); 
  return data;
};

// /api/reviews/:reviewId - Delete a Review
export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeReview(reviewId));
  } else {
    const err = await res.json();
    throw err;
  }
};

// /api/spots/:spotId - Delete a Spot
export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeSpot(spotId));
  } else {
    const err = await res.json();
    throw err;
  }
};

// /api/spot-images/:imageId - Delete an Image
export const deleteSpotImage = (imageId) => async () => {
  await csrfFetch(`/api/spot-images/${imageId}`, { method: 'DELETE' });
};

// export const deleteBooking = (bookingId) => async () => {
//   await csrfFetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
// };


// Update a spot
export const updateSpot = (spotData) => async (dispatch) => {
  const { id, ...data } = spotData;

  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(loadSingleSpot(updatedSpot));
    return updatedSpot;
  } else {
    const error = await response.json();
    throw error;
  }
};

// lookup reducers
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_SPOTS: {
        const newState = {};
        action.spots.forEach(spot => {
          newState[spot.id] = spot;
        });
        // console.log('newState: ', newState)
        // return newState;
        return { ...state, allSpots: newState }
      }
      case LOAD_SINGLE_SPOT: {
        return { ...state, singleSpot: action.singleSpot }
      }
      case ADD_SPOT: {
        return {
          ...state,
          allSpots: {
            ...state.allSpots,
            [action.spot.id]: action.spot
          },
          singleSpot: action.spot
        };
      }
      case ADD_REVIEW: {
        const newReview = {
          ...action.review,
          ReviewImages: [...(action.review.ReviewImages || [])] // clone the array
        };

        const existingReviews = (state.singleSpot.Reviews || []).map(review => ({
          ...review,
          ReviewImages: [...(review.ReviewImages || [])] // clone each one
        }));

        return {
          ...state,
          singleSpot: {
            ...state.singleSpot,
            Reviews: [newReview, ...existingReviews]
          }
        };
      }
      case DELETE_REVIEW: {
        const newState = {
          ...state,
          singleSpot: {
            ...state.singleSpot,
            Reviews: state.singleSpot.Reviews.filter(
              (review) => review.id !== action.reviewId
            )
          }
        };
        return newState;
      }
      case DELETE_SPOT: {
        const newState = { ...state };
        delete newState.allSpots[action.spotId];

        if (newState.singleSpot?.id === action.spotId) {
          newState.singleSpot = {};
        }

        return newState;
      }
      case UPDATE_SPOT: {
        return {
          ...state,
          allSpots: {
            ...state.allSpots,
            [action.spot.id]: action.spot
          },
          singleSpot: action.spot
        };
      }
       
      default:
        return state;
    }
};
  
export default spotsReducer;