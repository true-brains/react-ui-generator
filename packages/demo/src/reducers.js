import { combineReducers } from 'redux';
import deepmerge from 'deepmerge';
import { withDefaults } from '@react-ui-generator/core';

import {
  UPDATE_FORM,
  CLEAR_FORM,
  ADD_RELATIVE
} from '@actions';

const meta = require('@meta/complete');
const initialState = {
  meta,
  data: withDefaults({}, meta.fields),
  errors: {}
};

function reducer(state = initialState, { type: actionType, payload }) {
  switch (actionType) {
    case UPDATE_FORM:
      return merge(state, { data: payload.nextData, errors: payload.nextErrors });

    case CLEAR_FORM: {
      return { ...initialState };
    }
    
    case ADD_RELATIVE: {
      return state;
    }

    default:
      return state;
  }
}

export default reducer;


function overwriteMerge(destArray, sourceArray, options) {
  return sourceArray;
} 

function merge(dest, source) {
  return deepmerge(dest, source, { arrayMerge: overwriteMerge });
}