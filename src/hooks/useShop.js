import { displayActionMessage } from '@/helpers/utils';
import { addToShop as dispatchAddToShop, removeFromShop } from '@/redux/actions/shopActions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPersonalShopFilter } from '@/selectors/selector';
import firebase from '@/services/firebase';
import { useDidMount, useModal } from '@/hooks';

const useShop = () => {
  const { shop, user } = useSelector((state) => ({ 
    shop: state.shop,
    user: state.user
  }));
  const dispatch = useDispatch();
  const isItemOnShop = (id) => !!shop.products?.find((item) => item.id === id);
  const didMount = useDidMount();
  console.log("shop:", shop)
  console.log("user:", firebase.auth.currentUser)

  useEffect(() => {
    if (didMount && firebase.auth.currentUser && shop?.products?.length !== 0) {
      firebase.saveSellerShopProducts(shop.products, shop?.id)
      console.log("shopid:", shop)
    }
  }, [shop?.products?.length]);
  const addToShop = (product) => {
    if (isItemOnShop(product.id)) {
      dispatch(removeFromShop(product.id));
      displayActionMessage('Item removed from shop', 'info');
    } else {
      dispatch(dispatchAddToShop(product));
      displayActionMessage('Item added to shop', 'success');
    }
  };

  return { shop, isItemOnShop, addToShop };
};

export default useShop;
