import { GET_DATA, DATA_LOADING, FIND_CUSTOMERS } from '../actions/types';

const initialState = {
  customers: [],
  orderItems: [],
  orders: [],
  products: [],
  suppliers: [],
  foundCustomers: [],
  fetchError: '',
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_DATA:
      const {
        customers,
        orderItems,
        orders,
        products,
        suppliers
      } = action.payload;
      return {
        ...state,
        customers,
        orderItems,
        orders,
        products,
        suppliers,
        loading: false
      };
    case FIND_CUSTOMERS:
      const { foundCustomers, fetchError } = action.payload;
      return {
        ...state,
        foundCustomers,
        fetchError,
        loading: false
      };
    default:
      return state;
  }
}
