// import { displayActionMessage } from '@/helpers/utils';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToShop as dispatchAddToShop, removeFromShop } from '@/redux/actions/shopActions';

// const useGetUserShop = () => {
//   // const { shop } = useSelector((state) => ({ shop: state.shop }));
//   const { shop } = useSelector(() => ({ shop: {"products": []} }));
//   const dispatch = useDispatch();
//   const isItemOnShop = (id) => !!shop.products.find((item) => item.id === id);

//   const addToShop = (product) => {
//     if (isItemOnShop(product.id)) {
//       dispatch(removeFromShop(product.id));
//       displayActionMessage('Item removed from shop', 'info');
//     } else {
//       dispatch(dispatchAddToShop(product));
//       displayActionMessage('Item added to shop', 'success');
//     }
//   };

//   return { shop, isItemOnShop, addToShop };
// };

// export default useShop;
