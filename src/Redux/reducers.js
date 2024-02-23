import { combineReducers } from 'redux';
import userReducer from './userReducer'; 

const initialState = {
    cart: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_QUANTITY':
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload.orderId
              ? { ...item, quantity: action.payload.newQuantity }
              : item
          ),
        };
       default:
        return state;
    }
  };
  
  export default cartReducer;