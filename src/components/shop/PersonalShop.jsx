/* eslint-disable react/jsx-props-no-spreading */
import { AppliedFilters, ProductGrid, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop, useShop, useDidMount, useModal } from '@/hooks';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { selectPersonalShopFilter } from '@/selectors/selector';
import firebase from '@/services/firebase'
import {
  Link, NavLink, useLocation, useHistory
} from 'react-router-dom';
import { getUserShop } from '@/redux/actions/shopActions';

const PersonalShop = () => {
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  const { shop, user } = useSelector((state) => ({
    shop: state.shop,
    user: state.auth
  }));
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const didMount = useDidMount();
  useEffect(() => {
    if (didMount && firebase.auth.currentUser && shop.products.length !== 0) {
      firebase.saveShopProducts(shop.products, user.shopId)
    }
  }, [shop.products.length]);

  return (
    <></>
  );
};

export default PersonalShop;
