import { buildJSONSerializer } from '@react-ui-generator/serializers';

export const UPDATE_FORM = 'UPDATE_FORM';
export const TOGGLE_SEX = 'TOGGLE_SEX';
export const FORM_SENDING_START = 'FORM_SENDING_START';
export const FORM_SENDING_FINISH = 'FORM_SENDING_FINISH';
export const CLEAR_FORM = 'CLEAR_FORM';
export const ADD_RELATIVE = 'ADD_RELATIVE';
export const REMOVE_RELATIVE = 'REMOVE_RELATIVE';

export const toggleSex = payload => ({ type: TOGGLE_SEX, payload });
export const updateForm = payload => ({ type: UPDATE_FORM, payload });
export const clearForm = () => ({ type: CLEAR_FORM });

export const sendForm = () => (dispatch, getState) => {
  dispatch({ type: FORM_SENDING_START });

  const serialize = buildJSONSerializer();
  const { data, isValid } = getState();
  const serializedForm = serialize(data);

  if (isValid) {
    setTimeout(() => {
      console.log('Serialized data was successfully sent: ', serializedForm);
      dispatch({ type: FORM_SENDING_FINISH });
    }, 2000);
  }
};

export const addRelative = () => ({ type: ADD_RELATIVE });
export const removeRelative = idx => ({ type: REMOVE_RELATIVE, payload: idx });
