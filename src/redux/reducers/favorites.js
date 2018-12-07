import { FAVORITES } from '../types';
import { find, remove } from 'lodash';
import AsincStorage from 'app/services/AsincStorage';


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

      AsincStorage.set('favorites', list);
      console.log('set reducers favorite')

      return {
        ...state,
        list
      }
    }


    default: return state;
  }
}