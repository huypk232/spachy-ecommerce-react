import {
  ADD_QTY_ITEM, ADD_TO_SHOP,
  CLEAR_BASKET,
  MINUS_QTY_ITEM, REMOVE_FROM_SHOP,
  SET_BASKET_ITEMS,
  GET_USER_SHOP, GET_USER_SHOP_SUCCESS,
  SET_SHOP,
  ADD_SHOP
} from '@/constants/constants';

export const setShop = (shop) => ({
  type: SET_SHOP,
  payload: shop
});

export const addToShop = (product) => {
  // console.log(product)
  return ({
    type: ADD_TO_SHOP,
    payload: product
  })
};

export const addShop = (shop) => ({
  type: ADD_SHOP,
  payload: shop
});

export const removeFromShop = (id) => ({
  type: REMOVE_FROM_SHOP,
  payload: id
});

export const getUserShop = (shopId) => ({
  type: GET_USER_SHOP,
  payload: shopId
});

export const getUserShopSuccess = (shop) => ({
  type: GET_USER_SHOP_SUCCESS,
  payload: shop
});

