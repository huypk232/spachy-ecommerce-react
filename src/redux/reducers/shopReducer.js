import {
  ADD_TO_SHOP,
  REMOVE_FROM_SHOP,
  GET_USER_SHOP,
  SET_SHOP,
  ADD_SHOP, ADD_SHOP_SUCCESS
} from '@/constants/constants';

const initState = null;
// const initState = {
//   products: []
//   };

export default (state = initState, action) => {
  switch (action.type) {
    case SET_SHOP:
      return action.payload
    case GET_USER_SHOP:
      return {
        shop: action.payload
      }
    case ADD_TO_SHOP:
      if (state.products.some((product) => product.id === action.payload.id)) {
        return state
      }
      state.products = [action.payload, ... state.products]
      return state
    case ADD_SHOP:
      if (state.products.some((product) => product.id === action.payload.id)) {
        return state
      }
      state.products = [action.payload, ... state.products]
      return state
    case ADD_SHOP_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
      return state
    case REMOVE_FROM_SHOP:
      const remainProducts = state.products.filter((product) => product.id !== action.payload);
      state.products = remainProducts;
      return state
    default:
      return state;
  }
};
