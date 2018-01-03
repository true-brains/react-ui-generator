import { combineReducers } from 'redux';
import { withDefaults } from '@react-ui-generator/core';

import { UPDATE_FORM } from '@actions';

const meta = require('@meta/complete');

const initialState = {
  meta,
  data: withDefaults({}, meta.fields),
  errors: {}
};

function reducer(state = initialState, { type: actionType, payload }) {
  switch (actionType) {
    case UPDATE_FORM:
      return { ...state, data: payload.nextData, errors: payload.nextErrors };
    default:
      return state;
  }
}

export default reducer;
