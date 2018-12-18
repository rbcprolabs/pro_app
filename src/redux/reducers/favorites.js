import { FAVORITES } from '../types';
import { find, remove } from 'lodash';
import AsyncStorage from 'app/services/AsyncStorage';


export default function favorites(
  state = {
    list: [],
  },
  action = {}
) {

  switch (action.type) {
    case FAVORITES.set: {
      const { favorite } = action;
      let list = [...state.list];

      if (favorite[0]) {
        return {
          ...state,
          list: favorite
        }
      }

      find(list, {
        title: favorite.title,
        published: favorite.published,
        lead: favorite.lead
      }) ? remove(list, {
        title: favorite.title,
        published: favorite.published,
        lead: favorite.lead
      }) : list = [...list, favorite]

      AsyncStorage.set('favorites', list);

      return {
        ...state,
        list
      }
    }


    default: return state;
  }
}