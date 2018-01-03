import { combineReducers } from 'redux';

const meta = require('@meta/complete');
const identity = (state={}, action) => state;

export default combineReducers({
  meta: () => meta,
  data: identity,
  errors: identity,
});

