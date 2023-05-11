import { displayActionMessage } from '@/helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket as dispatchAddToBasket, removeFromBasket } from '@/redux/actions/basketActions';

const useCreateRequest = () => {
  const { shop } = useSelector((state) => ({ basket: state.basket }));
  const dispatch = useDispatch();
  // console.log("basket:", basket)
  const isItemHasRequest = (id) => !!basket.find((item) => item.id === id);
  const addToBasket = (product) => {
    if (isItemOnBasket(product.id)) {
      dispatch(removeFromBasket(product.id));
      displayActionMessage('Item removed from basket', 'info');
    } else {
      dispatch(dispatchAddToBasket(product));
      displayActionMessage('Item added to basket', 'success');
    }
  };

  return { basket, isItemOnBasket, addToBasket };
};

export default useCreateRequest;
