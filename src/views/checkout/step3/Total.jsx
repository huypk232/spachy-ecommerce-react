import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { CHECKOUT_STEP_2 } from '@/constants/routes';
import { useFormikContext } from 'formik';
import { displayMoney } from '@/helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { setPaymentDetails } from '@/redux/actions/checkoutActions';

import firebase from '@/services/firebase'
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { ORDER } from '@/constants/routes';
import { clearBasket } from '@/redux/actions/basketActions';


const Total = ({ isInternational, subtotal }) => {

  const { values, submitForm } = useFormikContext();
  const history = useHistory();
  const dispatch = useDispatch();
  const { basket, user } = useSelector((state) => ({
    basket: state.basket,
    user: state.auth
  }));

  const onClickBack = () => {
    // destructure to only select left fields omitting cardnumber and ccv
    const { cardnumber, ccv, ...rest } = values;

    dispatch(setPaymentDetails({ ...rest })); // save payment details
    history.push(CHECKOUT_STEP_2);
  };

  const onClearBasket = () => {
    if (basket.length !== 0) {
    }
  };

  const onConfirm = () => {
    const key = firebase.generateOrderKey()
    const order = {
      "basket": basket,
      "userId": user.id
    } 
    console.log(key)
    firebase.createOrder(key, order)
    firebase.saveBasketItems([], user.id)
    dispatch(clearBasket());

    history.push(ORDER)
  };

  return (
    <>
      <div className="basket-total text-right">
        <p className="basket-total-title">Total:</p>
        <h2 className="basket-total-amount">
          {displayMoney(subtotal + (isInternational ? 50 : 0))}
        </h2>
      </div>
      <br />
      <div className="checkout-shipping-action">
        <button
          className="button button-muted"
          onClick={() => onClickBack(values)}
          type="button"
        >
          <ArrowLeftOutlined />
          &nbsp;
          Go Back
        </button>
        <button
          className="button"
          disabled={false}
          onClick={onConfirm}
          type="button"
        >
          <CheckOutlined />
          &nbsp;
          Confirm
        </button>
      </div>
    </>
  );
};

Total.propTypes = {
  isInternational: PropType.bool.isRequired,
  subtotal: PropType.number.isRequired
};

export default Total;
