// /* eslint-disable indent */
// import {
//   GET_USER_SHOP,
//   GET_USER_SHOP_SUCCESS
// } from '@/constants/constants';
// // import { ADMIN_SHOPS } from '@/constants/routes';
// import { displayActionMessage } from '@/helpers/utils';
// import {
//   all, call, put, select
// } from 'redux-saga/effects';
// import { setLoading, setRequestStatus } from '@/redux/actions/miscActions';
// import { history } from '@/routers/AppRouter';
// import firebase from '@/services/firebase';
// import {
//   getUserShop, getUserShopSuccess
// } from '../actions/shopActions';

// function* initRequest() {
//   yield put(setLoading(true));
//   yield put(setRequestStatus(null));
// }

// function* handleError(e) {
//   yield put(setLoading(false));
//   yield put(setRequestStatus(e?.message || 'Failed to fetch shops'));
//   console.log('ERROR: ', e);
// }

// function* handleAction(location, message, status) {
//   if (location) yield call(history.push, location);
//   yield call(displayActionMessage, message, status);
// }

// function* shopSaga({ type, payload }) {
//   switch (type) {
//     case GET_USER_SHOP:
//       try {
//         yield initRequest();
//         const state = yield select();
//         const result = yield call(firebase.getUserShop, payload.shopId);
//         yield put(getUserShopSuccess({
//           shop: result.shop
//         }));
//         yield put(setRequestStatus(''));
//         yield put(setLoading(false));
//       } catch (e) {
//         console.log(e);
//         yield handleError(e);
//       }
//       break;
      
//     case GET_USER_SHOP_SUCCESS:
//       const snapshot = yield call(firebase.getUserShop, payload.shopId);

//       if (snapshot.data()) { // if user exists in database
//         const shop = snapshot.data();
//         yield put(setShop(shop));
//       } else {
//         console.log("There is no shop")
//       }
//       console.log("There is no shop")

//     case ADD_SHOP: {
//       try {
//         yield initRequest();

//         const key = yield call(firebase.generateKey);

//         const shop = {
//           ...payload,
//         };

//         yield call(firebase.addshop, key, shop);
//         yield put(addshopSuccess({
//           id: key,
//           ...shop
//         }));
//         yield put(setLoading(false));
//       } catch (e) {
//         yield handleError(e);
//         yield handleAction(undefined, `Item failed to add: ${e?.message}`, 'error');
//       }
//       break;
//     }
//     case ADD_TO_SHOP: {
//       try {
//         yield initRequest();

//         const key = yield call(firebase.saveShopProducts);

//         const shop = {
//           ...payload,
//         };

//         yield call(firebase.saveShopProducts, items, userId);
//         // yield put(addshopSuccess({
//         //   id: key,
//         //   ...shop
//         // }));
//         yield put(setLoading(false));
//       } catch (e) {
//         yield handleError(e);
//         yield handleAction(undefined, `Item failed to add: ${e?.message}`, 'error');
//       }
//       break;
//     }
//     case EDIT_SHOP: {
//       try {
//         yield initRequest();

//         const { image, imageCollection } = payload.updates;
//         let newUpdates = { ...payload.updates };

//         if (image.constructor === File && typeof image === 'object') {
//           try {
//             yield call(firebase.deleteImage, payload.id);
//           } catch (e) {
//             console.error('Failed to delete image ', e);
//           }

//           const url = yield call(firebase.storeImage, payload.id, 'shop', image);
//           newUpdates = { ...newUpdates, image: url };
//         }

//         if (imageCollection.length > 1) {
//           const existingUploads = [];
//           const newUploads = [];

//           imageCollection.forEach((img) => {
//             if (img.file) {
//               newUploads.push(img);
//             } else {
//               existingUploads.push(img);
//             }
//           });

//           const imageKeys = yield all(newUploads.map(() => firebase.generateKey));
//           const imageUrls = yield all(newUploads.map((img, i) => firebase.storeImage(imageKeys[i](), 'shop', img.file)));
//           const images = imageUrls.map((url, i) => ({
//             id: imageKeys[i](),
//             url
//           }));
//           newUpdates = { ...newUpdates, imageCollection: [...existingUploads, ...images] };
//         } else {
//           newUpdates = {
//             ...newUpdates,
//             imageCollection: [{ id: new Date().getTime(), url: newUpdates.image }]
//           };
//           // add image thumbnail to image collection from newUpdates to
//           // make sure you're adding the url not the file object.
//         }

//         yield call(firebase.editshop, payload.id, newUpdates);
//         yield put(editshopSuccess({
//           id: payload.id,
//           updates: newUpdates
//         }));
//         // yield handleAction(ADMIN_shopS, 'Item succesfully edited', 'success');
//         yield put(setLoading(false));
//       } catch (e) {
//         yield handleError(e);
//         yield handleAction(undefined, `Item failed to edit: ${e.message}`, 'error');
//       }
//       break;
//     }
//     case REMOVE_SHOP: {
//       try {
//         yield initRequest();
//         yield call(firebase.removeshop, payload);
//         yield put(removeshopSuccess(payload));
//         yield put(setLoading(false));
//         yield handleAction(ADMIN_shopS, 'Item succesfully removed', 'success');
//       } catch (e) {
//         yield handleError(e);
//         yield handleAction(undefined, `Item failed to remove: ${e.message}`, 'error');
//       }
//       break;
//     }
//     case SEARCH_SHOP: {
//       try {
//         yield initRequest();
//         // clear search data
//         yield put(clearSearchState());

//         const state = yield select();
//         const result = yield call(firebase.searchshops, payload.searchKey);

//         if (result.shops.length === 0) {
//           yield handleError({ message: 'No shop found.' });
//           yield put(clearSearchState());
//         } else {
//           yield put(searchshopSuccess({
//             shops: result.shops,
//             lastKey: result.lastKey ? result.lastKey : state.shops.searchedshops.lastRefKey,
//             total: result.total ? result.total : state.shops.searchedshops.total
//           }));
//           yield put(setRequestStatus(''));
//         }
//         yield put(setLoading(false));
//       } catch (e) {
//         yield handleError(e);
//       }
//       break;
//     }
//     default: {
//       throw new Error(`Unexpected action type ${type}`);
//     }
//   }
// }

// export default shopSaga;
