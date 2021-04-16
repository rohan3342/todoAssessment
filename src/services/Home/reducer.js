import { GET_ALL_NOTE, ADD_NOTE, DELETE_NOTE } from './actionType';
const initialState = {
  notes: undefined,
};

export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_NOTE:
      return { ...state, notes: action.payload };
    case ADD_NOTE:
      return { notes: action.payload };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
}
