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

const OrderItem = ({ order, isItemOnBasket, addToBasket, isItemOnShop, addToShop }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  const onClickItem = () => {
    if (!order) return;

    if (order.id) {
      history.push(`/orders/${order.id}`);
    }
  };

  const { shop, user } = useSelector((state) => ({
    shop: state.shop,
    user: state.auth
  }));

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`product-card ${!order.id ? 'product-loading' : ''}`}
      >
        <div
          className="product-card-content"
          onClick={onClickItem}
          role="presentation"
        >
          <div className="product-card-img-wrapper">
            {order.image ? (
              <ImageLoader
                alt={order.name}
                className="product-card-img"
                src={order.image}
              />
            ) : <Skeleton width="100%" height="90%" />}
          </div>
          <div className="product-details">
            <h5 className="product-card-name text-overflow-ellipsis margin-auto">
              {order.name || <Skeleton width={80} />}
            </h5>
            <p className="product-card-brand">
              {order.brand || <Skeleton width={60} />}
            </p>
            <h4 className="product-card-price">
              {order.price ? displayMoney(order.price) : <Skeleton width={40} />}
            </h4>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

OrderItem.defaultProps = {
  isItemOnBasket: undefined,
  addToBasket: undefined,
  isItemOShop: undefined,
  addToShop: undefined
};

OrderItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  Order: PropType.object.isRequired,
  isItemOnBasket: PropType.func,
  addToBasket: PropType.func,
  isItemOnShop: PropType.func,
  addToShop: PropType.func
};

export default OrderItem;
