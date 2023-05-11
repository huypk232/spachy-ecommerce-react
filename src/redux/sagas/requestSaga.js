/* eslint-disable indent */
import {
  GET_USER_request,
  GET_USER_request_SUCCESS
} from '@/constants/constants';
// import { ADMIN_requestS } from '@/constants/routes';
import { displayActionMessage } from '@/helpers/utils';
import {
  all, call, put, select
} from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '@/redux/actions/miscActions';
import { history } from '@/routers/AppRouter';
import firebase from '@/services/firebase';
import {
  getUserrequest, getUserrequestSuccess
} from '../actions/requestActions';

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus(e?.message || 'Failed to fetch requests'));
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* requestSaga({ type, payload }) {
  switch (type) {
    case GET_REQUEST:
      try {
        yield initRequest();
        const state = yield select();
        const result = yield call(firebase.getPartnerRequest, payload);

        yield put(getUserrequestSuccess({
          request: result.request
        }));
        yield put(setRequestStatus(''));
        yield put(setLoading(false));
      } catch (e) {
        console.log(e);
        yield handleError(e);
      }
      break;
      
    case GET_REQUEST_SUCCESS:
      const snapshot = yield call(firebase.getUserrequest, payload.requestId);

      if (snapshot.data()) { // if user exists in database
        const request = snapshot.data();
        yield put(setrequest(request));
      } else {
        console.log("There is no request")
      }
      console.log("There is no request")

    case ADD_request: {
      try {
        yield initRequest();

        const key = yield call(firebase.generateKey);

        const request = {
          ...payload,
        };

        yield call(firebase.addrequest, key, request);
        yield put(addrequestSuccess({
          id: key,
          ...request
        }));
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, `Item failed to add: ${e?.message}`, 'error');
      }
      break;
    }
    case EDIT_request: {
      try {
        yield initRequest();

        const { image, imageCollection } = payload.updates;
        let newUpdates = { ...payload.updates };

        if (image.constructor === File && typeof image === 'object') {
          try {
            yield call(firebase.deleteImage, payload.id);
          } catch (e) {
            console.error('Failed to delete image ', e);
          }

          const url = yield call(firebase.storeImage, payload.id, 'request', image);
          newUpdates = { ...newUpdates, image: url };
        }

        if (imageCollection.length > 1) {
          const existingUploads = [];
          const newUploads = [];

          imageCollection.forEach((img) => {
            if (img.file) {
              newUploads.push(img);
            } else {
              existingUploads.push(img);
            }
          });

          const imageKeys = yield all(newUploads.map(() => firebase.generateKey));
          const imageUrls = yield all(newUploads.map((img, i) => firebase.storeImage(imageKeys[i](), 'request', img.file)));
          const images = imageUrls.map((url, i) => ({
            id: imageKeys[i](),
            url
          }));
          newUpdates = { ...newUpdates, imageCollection: [...existingUploads, ...images] };
        } else {
          newUpdates = {
            ...newUpdates,
            imageCollection: [{ id: new Date().getTime(), url: newUpdates.image }]
          };
          // add image thumbnail to image collection from newUpdates to
          // make sure you're adding the url not the file object.
        }

        yield call(firebase.editrequest, payload.id, newUpdates);
        yield put(editrequestSuccess({
          id: payload.id,
          updates: newUpdates
        }));
        // yield handleAction(ADMIN_requestS, 'Item succesfully edited', 'success');
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, `Item failed to edit: ${e.message}`, 'error');
      }
      break;
    }
    case REMOVE_request: {
      try {
        yield initRequest();
        yield call(firebase.removerequest, payload);
        yield put(removerequestSuccess(payload));
        yield put(setLoading(false));
        yield handleAction(ADMIN_requestS, 'Item succesfully removed', 'success');
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, `Item failed to remove: ${e.message}`, 'error');
      }
      break;
    }
    case SEARCH_request: {
      try {
        yield initRequest();
        // clear search data
        yield put(clearSearchState());

        const state = yield select();
        const result = yield call(firebase.searchrequests, payload.searchKey);

        if (result.requests.length === 0) {
          yield handleError({ message: 'No request found.' });
          yield put(clearSearchState());
        } else {
          yield put(searchrequestSuccess({
            requests: result.requests,
            lastKey: result.lastKey ? result.lastKey : state.requests.searchedrequests.lastRefKey,
            total: result.total ? result.total : state.requests.searchedrequests.total
          }));
          yield put(setRequestStatus(''));
        }
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
      }
      break;
    }
    default: {
      throw new Error(`Unexpected action type ${type}`);
    }
  }
}

export default requestSaga;
