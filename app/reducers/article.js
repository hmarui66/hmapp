import {
  LOADING_ARTICLE,
  LOADED_ARTICLES,
  LOADED_ARTICLE,
  TYPING_ARTICLE,
  SAVING_ARTICLE,
  SAVED_ARTICLE,
  DESTROY_ARTICLE } from 'constants/actionTypes';

export default function article(state = {
  articles: []
}, action) {
  switch (action.type) {
    case LOADING_ARTICLE:
      return Object.assign({}, state, {
          articles: [],
          article: null
      });
    case LOADED_ARTICLES:
      const { articles} = action;
      return Object.assign({}, state,
        { articles }
      );
    case LOADED_ARTICLE:
      const { id, title, text, published } = action;
      return Object.assign({}, state,
        { article: { id, title, text, published, saving: false } }
      );
    case TYPING_ARTICLE:
      const { field, value } = action;
      if (field !== 'title' && field !== 'text' && field !== 'published') {
        return state;
      }

      return Object.assign({}, state,
        { article: { ...state.article, [field]: value } }
      );
    case SAVING_ARTICLE:
      return Object.assign({}, state,
        { article: { ...state.article, saving: true } }
      );
    case SAVED_ARTICLE:
      if (state.article && state.article.id && state.article.id !== action.id) {
        // already loaded other article
        return state;
      }
      return Object.assign({}, state,
        { article: { ...state.article, id: action.id, saving: false } }
      );
    case DESTROY_ARTICLE:
      return Object.assign({}, state,
        { articles: state.articles.filter(a => a.id !== action.id) }
      );

    default:
      return state;
  }
}
