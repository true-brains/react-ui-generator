export const UPDATE_FORM = 'UPDATE_FORM'
export const SEND_FORM = 'SEND_FORM'
export const CLEAR_FORM = 'CLEAR_FORM'

export const updateForm = payload => ({ type: UPDATE_FORM, payload });
export const clearForm = () => ({ type: CLEAR_FORM });

export const sendForm = () => dispatch => {
  alert('Form sended!');
  dispatch({ type: SEND_FORM });
}
