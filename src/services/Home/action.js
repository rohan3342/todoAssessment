import { GET_ALL_NOTE, ADD_NOTE, DELETE_NOTE } from './actionType';
import { URL, NOTES } from '../constant';

export const getAllNotes = id => async dispatch => {
  const res = await fetch(`${URL + NOTES + id}`, { method: 'GET' });
  const { response } = await res.json();
  dispatch({
    type: GET_ALL_NOTE,
    payload: response,
  });
};
