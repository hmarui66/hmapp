import { fetchGet } from 'lib/fetch';
import * as types from 'constants/actionTypes';

const resource = 'api/categories';

function loading() {
  return {
    type: types.LOADING_CATEGORIES
  };
}

function loaded(categories) {
  return {
    type: types.LOADED_CATEGORIES,
    categories
  };
}

export function load(context = {}) {
  return dispatch => {
    dispatch(loading());

    return fetchGet({
      path: resource,
      context
    }).then(res => {
      if (res.status >= 400) {
          throw new Error('Bad response from server');
      }
      return res.json();
    }).then(data => {
      return dispatch(loaded(data));
    }).catch(error => {
      throw new Error(error.message);
    });
  };
}
