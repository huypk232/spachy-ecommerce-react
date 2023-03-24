import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addShop } from '@/redux/actions/shopActions';

const ShopForm = lazy(() => import('./components/ShopForm'));

const UpsertShop = () => {
  useScrollTop();
  useDocumentTitle('Add New Product | Salinaka');
  const isLoading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  const onSubmit = (product) => {
    dispatch(addShop(product));
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      <Suspense fallback={(
        <div className="loader" style={{ minHeight: '80vh' }}>
          <h6>Loading ... </h6>
          <br />
          <LoadingOutlined />
        </div>
      )}
      >
        <ShopForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          product={{
            name: '',
            brand: '',
            price: 0,
            maxQuantity: 0,
            description: '',
            keywords: [],
            sizes: [],
            image: '',
            isFeatured: false,
            isRecommended: false,
            availableColors: [],
            imageCollection: []
          }}
        />
      </Suspense>
    </div>
  );
};

// ShopForm.propTypes = {
//   product: PropType.shape({
//     name: PropType.string,
//     brand: PropType.string,
//     price: PropType.number,
//     maxQuantity: PropType.number,
//     description: PropType.string,
//     keywords: PropType.arrayOf(PropType.string),
//     imageCollection: PropType.arrayOf(PropType.object),
//     sizes: PropType.arrayOf(PropType.string),
//     image: PropType.string,
//     imageUrl: PropType.string,
//     isFeatured: PropType.bool,
//     isRecommended: PropType.bool,
//     availableColors: PropType.arrayOf(PropType.string)
//   }).isRequired,
//   onSubmit: PropType.func.isRequired,
//   isLoading: PropType.bool.isRequired
// };



export default UpsertShop;
