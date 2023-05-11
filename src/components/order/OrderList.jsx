/* eslint-disable react/forbid-prop-types */
import { OrderItem } from '@/components/order';
import PropType from 'prop-types';
import React from 'react';

const OrderList = ({ orders, skeletonCount }) => (
  <div className="product-display-grid">
    {(orders?.length === 0) ? new Array(skeletonCount).fill({}).map((order, index) => (
      <OrderItem
        // eslint-disable-next-line react/no-array-index-key
        key={`product-skeleton ${index}`}
        order={order}
      />
    )) : orders?.map((order) => {
        return <OrderItem
          key={order.id}
          order={order}
        />
      }
    )}
  </div>
);

OrderList.defaultProps = {
  skeletonCount: 4
};

OrderList.propTypes = {
  orders: PropType.array.isRequired,
  skeletonCount: PropType.number
};

export default OrderList;
