import { DISPLAY_INDICATOR } from 'constants/actionTypes';

export default function indicator(state = {
  display: false
}, action) {
  switch (action.type) {
    case DISPLAY_INDICATOR:
      return Object.assign({}, state, {
          display: action.display
      });

    default:
      return state;
  }
}
