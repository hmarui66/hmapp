import {
  LOADED_ARTICLES,
  LOADED_ARTICLE,
  TYPING_ARTICLE } from 'constants/actionTypes';

export default function article(state = {
  articles: []
}, action) {
  switch (action.type) {
    case LOADED_ARTICLES:
      const { articles} = action;
      return Object.assign({}, state,
        { articles }
      );
    case LOADED_ARTICLE:
      const { id, title, text, published } = action;
      return Object.assign({}, state,
        { article: { id, title, text, published } }
      );
    case TYPING_ARTICLE:
      const { field, value } = action;
      if (field !== 'title' && field !== 'text' && field !== 'published') {
        return state;
      }

      return Object.assign({}, state,
        { article: { ...state.article, [field]: value } }
      );

    default:
      return state;
  }
}
