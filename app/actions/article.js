import { fetchGet, fetchPost, fetchDelete } from 'lib/fetch';
import * as types from 'constants/actionTypes';

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

export function loadList(path) {
  return dispatch => {
    dispatch(loading());

    return fetchGet(path).then(res => {
      if (res.status >= 400) {
          throw new Error('Bad response from server');
      }
      return res.json();
    }).then(data => {
      return dispatch(loadedList(data));
    }).catch(error => {
      throw new Error(error.message);
    });
  };
}

function loaded(article) {
  return {
    type: types.LOADED_ARTICLE,
    article
  };
}

export function loadArticle(id) {
  return dispatch => {
    dispatch(loading());

    return fetchGet(`article/${id}`).then(res => {
      if (res.status >= 400) {
          throw new Error('Bad response from server');
      }
      return res.json();
    }).then(article => {
      return dispatch(loaded(article));
    }).catch(error => {
      throw new Error(error.message);
    });
  };
}

export function createArticle() {
  return {
    type: types.LOADED_ARTICLE,
    article: {
      id: null,
      title: '',
      text: '',
      published: false
    }
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
    if (title.trim().length <= 0 || text.trim().length <= 0) {
      return dispatch({
        type: 'EMPTY_ARTICLE'
      });
    }
    dispatch(saving());

    return fetchPost('article', data).then(res => {
      if (res.status >= 400) {
          throw new Error('Bad response from server');
      }
      return res.json();
    }).then(article => {
      return dispatch(saved(article.id));
    }).catch(error => {
      throw new Error(error.message);
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

    return fetchDelete('article', { id });
  };
}

