import {
  LOADING_TAGS,
  LOADED_TAGS } from 'constants/actionTypes';

export default function tag(state = {
  tags: [],
  loading: false
}, action) {
  switch (action.type) {
    case LOADING_TAGS:
      return Object.assign({}, state, {
          loading: true
      });
    case LOADED_TAGS:
      const { tags } = action;
      return Object.assign({}, state,
        { tags, loading: false }
      );

    default:
      return state;
  }
}
