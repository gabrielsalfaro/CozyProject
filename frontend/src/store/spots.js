// Spots Slice to share fetched data
const LOAD_SPOTS = 'spots/LOAD_SPOTS'; // to identify the type of action being dispatched?

// this is the Action?
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
});

// moving fetch from Home
export const fetchSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots');
    if (res.ok) {
      const data = await res.json();
      dispatch(loadSpots(data.Spots)); // action: loadSpots
    }
};


// lookup reducers
const spotsReducer = (state = {}, action) => {
    switch (action.type) {
      case LOAD_SPOTS:
        const newState = {};
        action.spots.forEach(spot => {
          newState[spot.id] = spot;
        });
        // console.log('newState: ', newState)
        return newState;
      default:
        return state;
    }
};
  
export default spotsReducer;