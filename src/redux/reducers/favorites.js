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
      let list = [...state.list];

      if (action.favorite[0]) {
        return {
          ...state,
          list: action.favorite
        }
      }

      find(list, action.favorite) ? remove(list, action.favorite) : list = [...list, action.favorite]

      AsincStorage.set('favorites', list);

      return {
        ...state,
        list
      }
    }


    default: return state;
  }
}