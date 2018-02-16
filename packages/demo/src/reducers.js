import { combineReducers } from 'redux';
import deepmerge from 'deepmerge';
import {
  withDefaults,
  getMetaById
} from '@react-ui-generator/core';

import {
  UPDATE_FORM,
  CLEAR_FORM,
  ADD_RELATIVE,
  REMOVE_RELATIVE
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
      const subFormMeta = getMetaById('relatives', state.meta.fields);

      const newState = merge(state, {
        data: {
          relatives: {
            value: [
              ...state.data.relatives.value,
              withDefaults({}, subFormMeta.renderer.config.fields)
            ]
          }
        }
      });

      return newState;
    }

    case REMOVE_RELATIVE: {
      const idx = payload;
      const subFormMeta = getMetaById('relatives', state.meta.fields);
      const newValue = [ ...state.data.relatives.value ];

      newValue.splice(idx, 1);

      const newState = merge(state, {
        data: {
          relatives: { value: newValue }
        }
      });

      return newState;
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