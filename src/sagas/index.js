import { all, fork } from 'redux-saga/effects';

// import navSaga from './nav';
import searchSaga from './search';

//fork 는 함수를 실행한다. call 로 해도되는데 좀 차이점이 있다. 나중에... 파악해보자
export default function* rootSaga() {
  yield all([fork(searchSaga)]); // 마치 이벤트 리스너를 등록해준다 생각하자.
}
