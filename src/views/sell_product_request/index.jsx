import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { ColorChooser, ImageLoader, MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { RequestLine } from '@/components/sell_product_request';
import { WAREHOUSE, SHOP } from '@/constants/routes';
import { displayMoney } from '@/helpers/utils';
import {
  useDocumentTitle,
  useProduct,
  useWarehouseProducts,
  useSellProductRequest,
  useScrollTop,
  useProductResolver
} from '@/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import bannerImg from '@/images/banner-girl-1.png';
import firebase from '@/services/firebase';


const SellProductRequest = () => {
  useDocumentTitle('Request | Spachy');
  useScrollTop();

  const {
    warehouseProducts,
    fetchWarehouseProducts,
    isLoading,
    error
  } = useSellProductRequest();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Product Request</h1>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
        <div className="display">
          <div className="product-display-grid">
            {/* {(error && !isLoading) ? (
              <MessageDisplay
                message={error}
                action={fetchWarehouseProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={warehouseProducts}
                skeletonCount={6}
              />
            )} */}
            {(error && !isLoading) ? (
              <MessageDisplay
                message={error}
                action={fetchWarehouseProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <RequestLine
                products={warehouseProducts}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellProductRequest;
