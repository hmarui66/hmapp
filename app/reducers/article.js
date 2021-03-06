import {
  LOADING_ARTICLE,
  LOADED_ARTICLES,
  LOADED_ARTICLE,
  TYPING_ARTICLE,
  SAVING_ARTICLE,
  SAVED_ARTICLE,
  DESTROY_ARTICLE } from 'constants/actionTypes';

const inputFields = [
  'title',
  'text',
  'category',
  'tags',
  'published'
];

export default function article(state = {
  articles: [],
  article: null,
  loading: false
}, action) {
  switch (action.type) {
    case LOADING_ARTICLE:
      return Object.assign({}, state, {
          loading: true
      });
    case LOADED_ARTICLES:
      const { articles } = action;
      return Object.assign({}, state,
        { articles, loading: false }
      );
    case LOADED_ARTICLE:
      return Object.assign({}, state,
        { article: { ...action.article, saving: false }, loading: false }
      );
    case TYPING_ARTICLE:
      const { field, value } = action;
      if (!inputFields.includes(field)) {
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
        { articles: {
          ...state.articles,
          docs: state.articles.docs.filter(a => a.id !== action.id)}
        }
      );

    default:
      return state;
  }
}
