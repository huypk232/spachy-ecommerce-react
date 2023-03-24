import { CheckOutlined } from '@ant-design/icons';
import { ImageLoader } from '@/components/common';
import { displayMoney } from '@/helpers/utils';
import PropType from 'prop-types';
import React, { useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import firebase from '@/services/firebase'
import { useDocumentTitle, useScrollTop, useShop, useDidMount } from '@/hooks';

const RequestItem = ({ request }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  const onClickItem = () => {
    if (!request) return;

    if (request.id) {
      history.push(`/request/${request.id}`);
    }
  };

  const isApprove = false;
  // const handleAddToBasket = () => {
  //   if (addToBasket) addToBasket({ ...request, selectedSize: request.sizes[0] });
  // };

  const isDecline = false;
  // const handleAddToShop = () => {
  //   if (addToShop) addToShop({ ...request, selectedSize: request.sizes[0] })
  // };

  

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`request-card ${!request.id ? 'request-loading' : ''}`}
        style={{
          border: request && isApprove ? '1px solid #a6a5a5' : '',
          boxShadow: request && isApprove ? '0 10px 15px rgba(0, 0, 0, .07)' : 'none'
        }}
      >
        {isApprove && <CheckOutlined className="fa fa-check request-card-check" />}
        <div
          className="request-card-content"
          onClick={onClickItem}
          role="presentation"
        >
          <div className="request-card-img-wrapper">
            {request.image ? (
              <ImageLoader
                alt={request.name}
                className="request-card-img"
                src={request.image}
              />
            ) : <Skeleton width="100%" height="90%" />}
          </div>
          <div className="request-details">
            <h5 className="request-card-name text-overflow-ellipsis margin-auto">
              {request?.product?.name || <Skeleton width={80} />}
            </h5>
            <p className="request-card-brand">
              {request?.product?.brand || <Skeleton width={60} />}
            </p>
            <h4 className="request-card-price">
              {request?.product?.price ? displayMoney(request.price) : <Skeleton width={40} />}
            </h4>
          </div>
        </div>
        {request.id && (
          <div>
            <button
              className={`request-card-button button-small button button-block ${itemOnBasket ? 'button-border button-border-gray' : ''}`}
              onClick={handleAddToBasket}
              type="button"
            >
              {isApprove ? 'Approve' : 'Decline'}
            </button>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

RequestItem.defaultProps = {
  isItemOnBasket: undefined,
  addToBasket: undefined,
  isItemOShop: undefined,
  addToShop: undefined
};

RequestItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  request: PropType.object.isRequired,
  isItemOnBasket: PropType.func,
  addToBasket: PropType.func,
  isItemOnShop: PropType.func,
  addToShop: PropType.func
};

export default RequestItem;
