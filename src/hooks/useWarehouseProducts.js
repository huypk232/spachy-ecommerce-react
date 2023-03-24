import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firebase from '@/services/firebase';

const useWarehouseProducts = (itemsCount) => {
  const [warehouseProducts, setWarehouseProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const { user } = useSelector((state) => ({ user: state.auth }));
  const fetchWarehouseProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getWarehouseProducts(user.warehouseId, itemsCount);
        
      if (docs.empty) {
        if (didMount) {
          setError('No products found in this warehouse.');
          setLoading(false);
        }
      } else {

        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setWarehouseProducts(items);
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
    if (warehouseProducts.length === 0 && didMount) {
      fetchWarehouseProducts();
    }
  }, []);
  
  return {
    warehouseProducts, fetchWarehouseProducts, isLoading, error
  };
};

export default useWarehouseProducts;
