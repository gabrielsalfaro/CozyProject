import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SINGLE_SPOT = 'spots/LOAD_SINGLE_SPOT';
const ADD_SPOT = 'spots/ADD_SPOT';

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
  }

  if (spotRes.ok) {
    const spotData = await spotRes.json();
    spotData.Reviews = reviewsData.Reviews || []; // we [] if no reviews
    dispatch(loadSingleSpot(spotData));
  }
};

// /api/spots CreateNewSpot
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
       
      default:
        return state;
    }
};
  
export default spotsReducer;