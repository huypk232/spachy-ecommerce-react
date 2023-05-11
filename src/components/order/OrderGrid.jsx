import { useBasket, useShop } from '@/hooks';
import PropType from 'prop-types';
import React, { useState } from 'react';
import OrderItem from './OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { useDocumentTitle, useScrollTop, useDidMount } from '@/hooks';
import { selectPersonalShopFilter } from '@/selectors/selector';

const OrderGrid = ({ orders }) => {
  const { addToBasket, isItemOnBasket } = useBasket();
  const { addToShop, isItemOnShop } = useShop();

  return (
    <div className="product-grid">
      {orders.length === 0 ? new Array(12).fill({}).map((order, index) => (
        <OrderItem
          // eslint-disable-next-line react/no-array-index-key
          key={`product-skeleton ${index}`}
          order={order}
        />
      )) : orders.map((order) => (
        <OrderItem
          key={order.id}
          isItemOnBasket={isItemOnBasket}
          addToBasket={addToBasket}
          isItemOnShop={isItemOnShop}
          addToShop={addToShop}
          order={order}
        />
      ))}
    </div>
  );
};

OrderGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  orders: PropType.array.isRequired
};

export default OrderGrid;
