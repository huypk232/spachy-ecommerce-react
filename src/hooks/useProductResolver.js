import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useProduct from './useProduct';
import firebase from '@/services/firebase';

const useProductResolver = (requests) => {
  const [warehouseProducts, setWarehouseProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const { user } = useSelector((state) => ({ user: state.auth }));
  console.log(requests)
  const fetchProductResolver = () => {
    docs.forEach((snap) => {
      let data = snap.data()
      data.product = null;
      const fetchResolverProduct = async () => {
        const doc = await firebase.getSingleProduct(data.productId)
        if (doc.empty) {
          console.log("error")
        } else {
          const resolverProduct = doc.data()
          data.product = resolverProduct;
          console.log("sotghfgsd")

        }
      }
      useEffect(() => {
        console.log("sotghfgsd")

        if (data.product === null && didMount) {
  console.log("sotghfgsd")

          fetchResolverProduct();
        }
      }, []);
      const storeData = data

      items.push({ id: snap.ref.id, ...storeData });
      console.log(items)

    });
  }
  return {
    warehouseProducts, fetchProductResolver, isLoading, error
  };
};

export default useProductResolver;
