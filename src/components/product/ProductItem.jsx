import { CheckOutlined } from '@ant-design/icons';
import { ImageLoader } from '@/components/common';
import { displayMoney } from '@/helpers/utils';
import PropType from 'prop-types';
import React, { useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import firebase from '@/services/firebase'
import { useDocumentTitle, useScrollTop, useDidMount } from '@/hooks';

const ProductItem = ({ product, isItemOnBasket, addToBasket, isItemOnShop, addToShop }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  const onClickItem = () => {
    if (!product) return;

    if (product.id) {
      history.push(`/product/${product.id}`);
    }
  };

  const { shop, user } = useSelector((state) => ({
    shop: state.shop,
    user: state.auth
  }));
  
  const itemOnShop = isItemOnShop ? isItemOnShop(product.id) : false;
  const handleAddToShop = () => {
    if (addToShop) addToShop({ ...product, selectedSize: product.sizes[0] })
  };

  const itemOnBasket = isItemOnBasket ? isItemOnBasket(product.id) : false;
  const handleAddToBasket = () => {
    if (addToBasket) addToBasket({ ...product, selectedSize: product.sizes[0] });
  };

  

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`product-card ${!product.id ? 'product-loading' : ''}`}
        style={{
          border: product && itemOnBasket && itemOnShop ? '1px solid #a6a5a5' : '',
          boxShadow: product && itemOnBasket && itemOnShop? '0 10px 15px rgba(0, 0, 0, .07)' : 'none'
        }}
      >
        {itemOnBasket && itemOnShop && <CheckOutlined className="fa fa-check product-card-check" />}
        <div
          className="product-card-content"
          onClick={onClickItem}
          role="presentation"
        >
          <div className="product-card-img-wrapper">
            {product.image ? (
              <ImageLoader
                alt={product.name}
                className="product-card-img"
                src={product.image}
              />
            ) : <Skeleton width="100%" height="90%" />}
          </div>
          <div className="product-details">
            <h5 className="product-card-name text-overflow-ellipsis margin-auto">
              {product.name || <Skeleton width={80} />}
            </h5>
            <p className="product-card-brand">
              {product.brand || <Skeleton width={60} />}
            </p>
            <h4 className="product-card-price">
              {product.price ? displayMoney(product.price) : <Skeleton width={40} />}
            </h4>
          </div>
        </div>
        {((user.role === "PARTNER") && product.id && (
          <div>
            <button
              className={`product-card-button button-small button button-block ${itemOnShop ? 'button-border button-border-gray' : ''}`}
              onClick={handleAddToShop}
              type="button"
            >
              {itemOnShop ? 'Remove from shop' : 'Add to shop'}
            </button>
            <button
              className={`product-add-to-shop-button button-small button button-block ${itemOnBasket ? 'button-border button-border-gray' : ''}`}
              onClick={handleAddToBasket}
              type="button"
            >
              {itemOnBasket ? 'Remove from Basket' : 'Add to Basket'}
            </button>
          </div>
        )) || ((user.role !== "PARTNER") && product.id && (
          <div>
            <button
              className={`product-add-to-shop-button button-small button button-block ${itemOnBasket ? 'button-border button-border-gray' : ''}`}
              onClick={handleAddToBasket}
              type="button"
            >
              {itemOnBasket ? 'Remove from Basket' : 'Add to Basket'}
            </button>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

ProductItem.defaultProps = {
  isItemOnBasket: undefined,
  addToBasket: undefined,
  isItemOShop: undefined,
  addToShop: undefined
};

ProductItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropType.object.isRequired,
  isItemOnBasket: PropType.func,
  addToBasket: PropType.func,
  isItemOnShop: PropType.func,
  addToShop: PropType.func
};

export default ProductItem;
