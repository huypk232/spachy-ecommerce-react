/* eslint-disable react/jsx-props-no-spreading */
import { AppliedFilters, ProductGrid, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop, useShop, useDidMount } from '@/hooks';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { selectPersonalShopFilter } from '@/selectors/selector';
import firebase from '@/services/firebase'
import {
  Link, NavLink, useLocation
} from 'react-router-dom';
import { getUserShop } from '@/redux/actions/shopActions';

const PersonalShop = () => {
  useDocumentTitle('My Shops | Spachy');
  useScrollTop();

  const [isFetching, setFetching] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  

  const store = useSelector((state) => ({
    // filteredProducts: selectPersonalShopFilter(state.shop, state.filter),
    filteredProducts: [],
    products: state.products,
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    shop: state.shop,
    user: state.auth,
    isAuthenticating: state.app.isAuthenticating,
  }));

  const onClickLink = (e) => {
    if (store.isAuthenticating) e.preventDefault();
  };

  const handleCreateShop = () => {
    if (shop !== undefined || shop !== null) createShop();
  };
  return (
    <main className="content">
      <section className="product-list-wrapper">
        {(store.shop === undefined) ? (
          <div className="loader">
            <h3>You have no shop yet! Want create one?</h3>            
            <Link onClick={onClickLink} to="/personal_shop/upsert">
              <button
                className={`button-small button button-block `}
                // onClick={handleCreateShop}
                type="button"
              >
                Create your own shop
              </button>
            </Link>
          </div>
        ) : (
          // ((store.shop === undefined) ? (
          ((store.shop.products.length === 0) ? (
            <div className="loader">
            <h3>Your shop has no product yet! Wanna choose some?</h3>            
            <Link onClick={onClickLink} to="/recommended">
              <button
                className={`button-small button button-block `}
                // onClick={handleCreateShop}
                type="button"
              >
                Add new featured product
              </button>
            </Link>
            </div>
          ) : (
            <div>
            <AppliedFilters filteredProductsCount={store.filteredProducts.length} />
            {/* <AppliedFilters filteredProductsCount={1} /> */}
            <ProductList {...store}>
              <ProductGrid products={store.shop.products} />
            </ProductList>
            </div>
          )) 
        )}
        
      </section>
    </main>
  );
};

export default PersonalShop;
