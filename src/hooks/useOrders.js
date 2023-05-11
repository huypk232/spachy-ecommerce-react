import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firebase from '@/services/firebase';

const useOrders = (itemsCount) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const { user } = useSelector((state) => ({ user: state.auth }));
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getUserOrders(user.id, itemsCount);
        
      if (docs.empty) {
        if (didMount) {
          setError('You have no orders');
          setLoading(false);
        }
      } else {

        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setOrders(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch products in this warehouse');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (orders.length === 0 && didMount) {
      fetchOrders();
    }
  }, []);
  
  return {
    orders, fetchOrders, isLoading, error
  };
};

export default useOrders;
