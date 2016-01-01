import {
  LOADED_ARTICLE,
  TYPING_ARTICLE } from 'constants/actionTypes';

export default function article(state = {
  articles: []
}, action) {
  switch (action.type) {
    case LOADED_ARTICLE:
      const { id, title, text } = action;
      return Object.assign({}, state,
        { article: { id, title, text } }
      );
    case TYPING_ARTICLE:
      const { field, value } = action;
      if (field !== 'title' && field !== 'text') {
        return state;
      }

      return Object.assign({}, state,
        { article: { ...state.article, [field]: value } }
      );

    default:
      return state;
  }
}
