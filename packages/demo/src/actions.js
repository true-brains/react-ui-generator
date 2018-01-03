export const SEND_FORM = 'SEND_FORM'

export const sendForm = () => dispatch => {
  alert('Form sended!');
  dispatch({ type: SEND_FORM });
}
