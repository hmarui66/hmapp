import { DID_MOUNT } from 'constants/actionTypes';

export default function app(state = {
  didMount: false
}, action) {
  switch (action.type) {
    case DID_MOUNT:
      return Object.assign({}, state, {
          didMount: true
      });

    default:
      return state;
  }
}
