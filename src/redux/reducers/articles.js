import { ARTICLES } from '../types';

export default function articles(
  state = {
    list: [],
    mostPopularTags: {},
  },
  action = {}
) {
  // console.log('action categories ', action)
  switch (action.type) {
    case ARTICLES.get: {
      return {
        ...state,
        list: action.list,
        mostPopularTags: action.mostPopularTags
      }
    }


    default: return state;
  }
}