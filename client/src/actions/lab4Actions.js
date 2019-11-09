import axios from 'axios';

import {
  GET_DATA,
  DATA_LOADING,
  FIND_ORDERS,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

// Get Datasets
export const getData = () => dispatch => {
  dispatch(setDataLoading());
  axios
    .get('/api/lab4')
    .then(res =>
      dispatch({
        type: GET_DATA,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DATA,
        payload: null
      })
    );
};

// Find customers who ve bought some product on specified summary
export const findOrders = date => dispatch => {
  dispatch(setDataLoading());
  console.log(date);

  axios
    .get(`/api/lab4/orders/${date}`)
    .then(res =>
      dispatch({
        type: FIND_ORDERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: FIND_ORDERS,
        payload: err.data
      })
    );
};

// Set loading state
export const setDataLoading = () => {
  return {
    type: DATA_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
