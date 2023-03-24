import { useBasket, useShop } from '@/hooks';
import PropType from 'prop-types';
import React, { useState } from 'react';
import RequestItem from './RequestItem';
import { useDispatch, useSelector } from 'react-redux';
import { useDocumentTitle, useScrollTop, useDidMount, useProduct } from '@/hooks';
import { selectPersonalShopFilter } from '@/selectors/selector';
import { FeaturedProduct } from '@/components/product';
import firebase from '@/services/firebase';

const RequestLine = ({ products, skeletonCount }) => {
  const endRequests = [];
  products.forEach((element) => {
    const fetchResolverProduct = async () => {
      const doc = await firebase.getSingleProduct(element.productId)

      if (doc.exists) {
        const resolverProduct = doc.data()
        element.product = resolverProduct;
        endRequests.push({ id: element.id, ... element })

      } else {
        console.log("error")
      }
    }
    fetchResolverProduct();

  });
  console.log(endRequests);

  return (
    <div className="product-display-grid">
      {(products?.length === 0) ? new Array(skeletonCount).fill({}).map((product, index) => (
        <FeaturedProduct
          // eslint-disable-next-line react/no-array-index-key
          key={`product-skeleton ${index}`}
          product={product}
        />
      )) : endRequests?.forEach((request) => {
        console.log(request)
        return (
        <FeaturedProduct
          key={request.productId}
          product={request.product}
        />
        )}
      )}
    </div>
  );
};

RequestLine.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropType.array.isRequired
};

export default RequestLine;
