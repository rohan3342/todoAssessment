import {
  GET_ALL_NOTE,
  ADD_NOTE,
  DELETE_NOTE,
  TOGGLE_THEME,
  RESET_THEME_ON_LOGOUT,
} from './actionType';
const initialState = {
  notes: undefined,
  darkTheme: false,
};

export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_NOTE:
      return { ...state, notes: action.payload };
    case ADD_NOTE:
      return { ...state, notes: action.payload };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(item => item.id !== action.payload),
      };
    case TOGGLE_THEME:
      console.log('darkTheme : Before ==>', state.darkTheme);
      console.log('darkTheme : After  ==>', !state.darkTheme);
      return { ...state, darkTheme: !state.darkTheme };
    case RESET_THEME_ON_LOGOUT:
      console.log('Logout Theme Reset ==>', false);
      return { ...state, darkTheme: false };
    default:
      return state;
  }
}
