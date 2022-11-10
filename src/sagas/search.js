import {
  all,
  fork,
  task,
  call,
  takeLatest,
  put,
  delay,
} from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../components/Config/Config';

import {
  SEARCH_ACCOMMODATION_REQUEST,
  SEARCH_ACCOMMODATION_SUCCESS,
  SEARCH_ACCOMMODATION_FAILURE,
} from '../reducers/search';

function searchAPI(data) {
  return axios.get(
    `${BASE_URL}/rooms?${data.startDay}${data.endDay}${data.selectLocation}${data.totalGuest}`
  );
}

function* searchAccommodation(action) {
  try {
    const result = yield call(searchAPI, action.data);
    yield put({
      type: SEARCH_ACCOMMODATION_SUCCESS,
      data: result,
    });
  } catch (err) {
    yield put({
      type: SEARCH_ACCOMMODATION_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSearchAccommodation() {
  yield takeLatest(SEARCH_ACCOMMODATION_REQUEST, searchAccommodation);
}

export default function* searchSaga() {
  yield all([fork(watchSearchAccommodation)]);
}
