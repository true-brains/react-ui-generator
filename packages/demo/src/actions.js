export const UPDATE_FORM = 'UPDATE_FORM'
export const SEND_FORM = 'SEND_FORM'

export const updateForm = payload => dispatch => {
  dispatch({ type: UPDATE_FORM, payload });
}

export const sendForm = () => dispatch => {
  alert('Form sended!');
  dispatch({ type: SEND_FORM });
}
