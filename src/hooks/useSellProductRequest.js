// import { useDidMount } from '@/hooks';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import firebase from '@/services/firebase';

// const useSellProductRequest = (itemsCount) => {
//   const [request, setRequest] = useState([]);
//   const [isLoading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const didMount = useDidMount(true);

//   const { user } = useSelector((state) => ({ user: state.auth }));
//   const fetchRequest = async () => {
//     try {
//       setLoading(true);
//       setError('');

//       const docs = await firebase.getVendorRequests(user.id, itemsCount);
        
//       if (docs.empty) {
//         if (didMount) {
//           setError('No request found yet, ad your product now?');
//           setLoading(false);
//         }
//       } else {

//         const items = [];
//         docs.forEach((snap) => {
//           const data = snap.data();
//           items.push({ id: snap.ref.id, ...data });
//         });

//         if (didMount) {
//           setRequest(items);
//           setLoading(false);
//         }
//       }
//     } catch (e) {
//       if (didMount) {
//         setError('Failed to fetch products in this warehouse');
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     if (request.length === 0 && didMount) {
//       fetchRequest();
//     }
//   }, []);
//   return {
//     request, fetchRequest, isLoading, error
//   };
// };

// export default useSellProductRequest;

import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useProduct from './useProduct';
import firebase from '@/services/firebase';

const useSellProductRequest = (itemsCount) => {
  const [warehouseProducts, setWarehouseProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const { user } = useSelector((state) => ({ user: state.auth }));
  const fetchWarehouseProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getVendorRequests(user.id, itemsCount);
        
      if (docs.empty) {
        if (didMount) {
          setError('No products found in this warehouse.');
          setLoading(false);
        }
      } else {

        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          data.product = null
          const fetchResolverProduct = async () => {
            const doc = await firebase.getSingleProduct(data.productId)
            if (doc.empty) {
              console.log("error")
            } else {
              const resolverProduct = doc.data()
              console.log(1);
              data.product = resolverProduct
            }
          }
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

export default useSellProductRequest;
