import * as types from 'constants/actionTypes';

export function show() {
  return {
    type: types.DISPLAY_INDICATOR,
    display: true
  };
}

export function hide() {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: types.DISPLAY_INDICATOR,
        display: false
      });
    }, 800);
  };
}
