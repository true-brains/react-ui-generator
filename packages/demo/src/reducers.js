import { combineReducers } from 'redux';
import deepmerge from 'deepmerge';
import { withDefaults } from '@react-ui-generator/core';

import {
  UPDATE_FORM,
  TOGGLE_SEX,
  CLEAR_FORM
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

    case TOGGLE_SEX: {
      const fieldsMeta = state.meta.fields;

      for (let item of fieldsMeta) {
        if (item.id === 'sex') {
          item.renderer.config.isOpen = !item.renderer.config.isOpen
          break;
        }
      }

      return merge(state, { meta: { fields: fieldsMeta } });
    }

    case CLEAR_FORM:
      return { ...initialState };

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