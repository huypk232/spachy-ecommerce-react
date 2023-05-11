import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { ColorChooser, ImageLoader, MessageDisplay } from '@/components/common';
import { OrderList } from '@/components/order';
import { WAREHOUSE, SHOP } from '@/constants/routes';
import { displayMoney } from '@/helpers/utils';
import {
  useBasket,
  useDocumentTitle,
  useProduct,
  useOrders,
  useScrollTop,
  useShop
} from '@/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import bannerImg from '@/images/banner-girl-1.png';

const OrderDetail = () => {
  useDocumentTitle('Order Detail | Spachy');
  useScrollTop();

  const {
    orders,
    fetchOrders,
    isLoading,
    error
  } = useOrders();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Order</h1>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
        <div className="display">
          <div className="product-display-grid">
            {(error && !isLoading) ? (
              <MessageDisplay
                message={error}
                action={fetchOrders}
                buttonLabel="Try Again"
              />
            ) : (
              <OrderItem
                orders={orders}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetail;
