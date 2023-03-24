import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firebase from '@/services/firebase';

const useDraft = (itemsCount) => {
  const [request, setRequest] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const { user } = useSelector((state) => ({ user: state.auth }));
  const fetchRequest = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getVendorRequests(user.id);
        
      if (docs.empty) {
        if (didMount) {
          setError('No request found yet, ad your product now?');
          setLoading(false);
        }
      } else {

        const items = [];
        docs.forEach((snap) => {
          const data = snap.data();
          // data.product = null
          // const fetchResolverProduct = async () => {
          //   const doc = await firebase.getProduct(data.productId)
          //   if (docs.empty) {
          //     console.log("error")
          //   } else {
          //     const resolverProduct = doc.data()
          //     data.product = resolverProduct
          //   }
          // }
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setRequest(items);
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
    if (request.length === 0 && didMount) {
      fetchRequest();
    }
  }, []);

  return {
    request, fetchRequest, isLoading, error
  };
};

export default useDraft;
