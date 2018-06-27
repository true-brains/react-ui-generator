import deepmerge from 'deepmerge';

import {
  withDefaults,
  findFieldMetaById,
} from '@react-ui-generator/core';

import {
  UPDATE_FORM,
  CLEAR_FORM,
  FORM_SENDING_START,
  FORM_SENDING_FINISH,
  ADD_RELATIVE,
  REMOVE_RELATIVE
} from '@actions';

const meta = require('@meta/complete');
const initialState = {
  meta,
  data: withDefaults({}, meta.fields),
  errors: {},
  dirtiness: {},
  isValid: false,
};

function reducer(state = initialState, { type: actionType, payload }) {
  switch (actionType) {
    case UPDATE_FORM: {
      return merge(state, payload);
    }

    case CLEAR_FORM: {
      return { ...initialState };
    }

    case FORM_SENDING_START: {
      return { ...state, isFetching: true };
    }

    case FORM_SENDING_FINISH: {
      return { ...state, isFetching: false };
    }
    
    case ADD_RELATIVE: {
      const subFormMeta = findFieldMetaById('relatives', state.meta.fields);

      const newState = merge(state, {
        data: {
          relatives: [
            ...state.data.relatives,
            withDefaults({}, subFormMeta.renderer.config.fields)
          ]
        }
      });

      return newState;
    }

    case REMOVE_RELATIVE: {
      const idx = payload;
      const subFormMeta = findFieldMetaById('relatives', state.meta.fields);
      const newValue = [ ...state.data.relatives ];

      newValue.splice(idx, 1);

      const newState = merge(state, {
        data: {
          relatives: newValue
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