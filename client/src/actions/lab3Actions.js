import axios from 'axios';

import {
  GET_DATASETS,
  DATASETS_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  ADD_RECORD,
  REMOVE_RECORD
} from './types';

// Get Datasets
export const getDatasets = () => dispatch => {
  dispatch(setDatasetsLoading());
  axios
    .get('/api/lab3')
    .then(res =>
      dispatch({
        type: GET_DATASETS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DATASETS,
        payload: null
      })
    );
};

// Add record
export const addRecord = recordData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/lab3/dataset', recordData)
    .then(res =>
      dispatch({
        type: ADD_RECORD,
        payload: res.data.dataset.record[0]
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete record
export const deleteRecord = name => dispatch => {
  axios
    .delete(`/api/lab3/dataset/${name}`)
    .then(res =>
      dispatch({
        type: REMOVE_RECORD,
        payload: name
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setDatasetsLoading = () => {
  return {
    type: DATASETS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
