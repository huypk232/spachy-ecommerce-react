import { useBasket, useShop } from '@/hooks';
import PropType from 'prop-types';
import React, { useState } from 'react';
import ProductItem from './ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { useDocumentTitle, useScrollTop, useDidMount } from '@/hooks';
import { selectPersonalShopFilter } from '@/selectors/selector';

const ProductGrid = ({ products }) => {
  const { addToBasket, isItemOnBasket } = useBasket();
  const { addToShop, isItemOnShop } = useShop();

  return (
    <div className="product-grid">
      {products.length === 0 ? new Array(12).fill({}).map((product, index) => (
        <ProductItem
          // eslint-disable-next-line react/no-array-index-key
          key={`product-skeleton ${index}`}
          product={product}
        />
      )) : products.map((product) => (
        <ProductItem
          key={product.id}
          isItemOnBasket={isItemOnBasket}
          addToBasket={addToBasket}
          isItemOnShop={isItemOnShop}
          addToShop={addToShop}
          product={product}
        />
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropType.array.isRequired
};

export default ProductGrid;
