import { ARTICLES } from '../types';

export default function articles(
  state = {
    list: [],
    mostPopularTags: {},
    basketCards: [],
  },
  action = {}
) {
  const { type, ...data } = action;
  // console.log('action categories ', action)
  switch (type) {
    case ARTICLES.get: {
      return {
        ...state,
        ...data
      }
    }


    default: return state;
  }
}