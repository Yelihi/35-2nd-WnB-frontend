import { combineReducers } from 'redux';

import nav from './nav';
import search from './search';

const rootReducer = combineReducers({
  nav,
  search,
});

export default rootReducer;
