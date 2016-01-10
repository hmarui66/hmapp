// Including es6-promise so isomorphic fetch will work
import 'es6-promise';
import fetch from 'isomorphic-fetch';
import * as types from 'constants/actionTypes';

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
function makeArticleRequest(method, data, api='/article') {
  const req = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };

  if (method !== 'get') {
    req.body = JSON.stringify(data);
  }
  return fetch(api, req);
}

function loading() {
  return {
    type: types.LOADING_ARTICLE
  };
}

function loadedList(articles) {
  return {
    type: types.LOADED_ARTICLES,
    articles
  };
}

export function loadList(api) {
  return dispatch => {
    dispatch(loading());

    makeArticleRequest('get', null, api)
      .then(res => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.json();
      })
      .then(data => {
        dispatch(loadedList(data));
      });
  };
}

function loaded(article) {
  const { id, title, text, published } = article;
  return {
    type: types.LOADED_ARTICLE,
    id, title, text, published
  };
}

export function loadArticle(id) {
  return dispatch => {
    dispatch(loading());

    makeArticleRequest('get', null, `/article/${id}`)
      .then(res => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.json();
      })
      .then(article => {
        dispatch(loaded(article));
      });
  };
}

export function createArticle() {
  return {
    type: types.LOADED_ARTICLE,
    id: null,
    title: '',
    text: '',
    published: false
  };
}

export function typing(field, value) {
  return {
    type: types.TYPING_ARTICLE,
    field,
    value
  };
}

function saving() {
  return {
    type: types.SAVING_ARTICLE
  };
}

function saved(id) {
  return {
    type: types.SAVED_ARTICLE,
    id
  };
}

export function saveArticle(data) {
  const { title, text } = data;

  return dispatch => {
    if (title.trim().length <= 0 || text.trim().length <= 0) return;
    dispatch(saving());

    makeArticleRequest('post', data)
      .then(res => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.json();
      })
      .then(article => {
        dispatch(saved(article.id));
      });
  };
}

function destroy(id) {
  return {
    type: types.DESTROY_ARTICLE,
    id
  };
}

export function destroyArticle(id) {
  return dispatch => {
    dispatch(destroy(id));

    return makeArticleRequest('delete', { id });
  };
}

