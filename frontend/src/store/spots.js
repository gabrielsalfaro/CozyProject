const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SINGLE_SPOT = 'spots/LOAD_SINGLE_SPOT';

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

// spots/:spotId/review fetch
export const fetchSingleSpotWithReviews = (spotId) => async (dispatch) => {
  const spotRes = await fetch(`/api/spots/${spotId}`);
  const reviewsRes = await fetch(`/api/spots/${spotId}/reviews`);

  if (spotRes.ok && reviewsRes.ok) {
    const spotData = await spotRes.json();
    const reviewsData = await reviewsRes.json();
    // Add reviews to spot data before dispatching
    spotData.Reviews = reviewsData.Reviews;
    dispatch(loadSingleSpot(spotData));
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
       
      default:
        return state;
    }
};
  
export default spotsReducer;