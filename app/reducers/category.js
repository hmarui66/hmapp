import {
  LOADING_CATEGORIES,
  LOADED_CATEGORIES } from 'constants/actionTypes';

export default function category(state = {
  categories: [],
  loading: false
}, action) {
  switch (action.type) {
    case LOADING_CATEGORIES:
      return Object.assign({}, state, {
          loading: true
      });
    case LOADED_CATEGORIES:
      const { categories } = action;
      return Object.assign({}, state,
        { categories, loading: false }
      );

    default:
      return state;
  }
}
