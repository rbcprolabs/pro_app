import { ARTICLES } from '../types';

export default function articles(
  state = {
    list: [],
  },
  action = {}
) {
  // console.log('action categories ', action)
  switch (action.type) {
    case ARTICLES.get: {
      return {
        ...state,
        list: action.list
      }
    }


    default: return state;
  }
}