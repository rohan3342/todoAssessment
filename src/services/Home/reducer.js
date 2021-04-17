import {
  GET_ALL_NOTE,
  ADD_NOTE,
  DELETE_NOTE,
  TOGGLE_THEME,
} from './actionType';
const initialState = {
  notes: undefined,
  themeDark: false,
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
    case TOGGLE_THEME:
      console.log('themeDark : Before ==>', state.themeDark);
      console.log('themeDark : After  ==>', !state.themeDark);
      return { ...state, themeDark: !state.themeDark };
    default:
      return state;
  }
}
