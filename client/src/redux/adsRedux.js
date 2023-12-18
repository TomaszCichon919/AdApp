
import { API_URL } from '../config';

/* SELECTORS */
export const getAds = ({ ads }) => ads;


/* ACTIONS */

// action name creator
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;



const LOAD_ADS = createActionName('LOAD_ADS');
const REMOVE_ADS = createActionName('REMOVE_ADS');
const EDIT_ADS = createActionName('EDIT_ADS');



export const loadAds = payload => ({ payload, type: LOAD_ADS });
export const removeAd = payload => ({ type: REMOVE_ADS, payload });
export const editPost = payload => ({ type: EDIT_ADS, payload });

/* THUNKS */


export const loadAdsRequest = () => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:8000/api/ads');

      if (response.ok) {
        const data = await response.json();
        dispatch(loadAds(data)); // Dispatch the action with fetched data
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };
};



/* REDUCER */

const adsReducer =(statePart = [], action = {}) => {
    switch (action.type) {
      case LOAD_ADS:
        return [...action.payload]
      case REMOVE_ADS:
        const updatedAds = statePart.filter(ad => ad._id !== action.payload);
        statePart = updatedAds
        return statePart;
        case EDIT_ADS:
      return statePart.map(ad => (ad._id === action.payload.id ? { ...ad, ...action.payload } : ad));
    default:
      return statePart;
  }
}
export default adsReducer;