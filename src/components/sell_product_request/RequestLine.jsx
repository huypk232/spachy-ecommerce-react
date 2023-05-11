import { useBasket, useShop } from '@/hooks';
import PropType from 'prop-types';
import React, { useState } from 'react';
import RequestItem from './RequestItem';
import { useDispatch, useSelector } from 'react-redux';
import { useDocumentTitle, useScrollTop, useDidMount, useProduct } from '@/hooks';
import { selectPersonalShopFilter } from '@/selectors/selector';
import { FeaturedProduct } from '@/components/product';
import firebase from '@/services/firebase';

const RequestLine = ({ products, skeletonCount }) => (
  <div className="product-display-grid">
    {(products?.length === 0) ? new Array(skeletonCount).fill({}).map((product, index) => (
      <FeaturedProduct
        // eslint-disable-next-line react/no-array-index-key
        key={`product-skeleton ${index}`}
        product={product}
      />
    )) : products?.map((product) => {
        // console.log(product)
        return <FeaturedProduct
          key={product.id}
          product={product?.product}
        />
      }
    )}
  </div>
)

RequestLine.defaultProps = {
  skeletonCount: 4
};

RequestLine.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropType.array.isRequired,
  skeletonCount: PropType.number
};

export default RequestLine;
