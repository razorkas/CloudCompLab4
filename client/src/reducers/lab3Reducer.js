import {
  GET_DATASETS,
  DATASETS_LOADING,
  ADD_RECORD,
  REMOVE_RECORD
} from '../actions/types';

const initialState = {
  filedata: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DATASETS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_DATASETS:
      const { data } = action.payload;
      return {
        ...state,
        filedata: data,
        loading: false
      };
    case ADD_RECORD:
      return {
        ...state,
        filedata: [action.payload, ...state.filedata]
      };
    case REMOVE_RECORD:
      return {
        ...state,
        filedata: state.filedata.filter(item => item.name !== action.payload)
      };
    default:
      return state;
  }
}
