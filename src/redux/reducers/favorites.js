import { FAVORITES } from '../types';
import { find, remove } from 'lodash';


export default function favorites(
  state = {
    list: [],
  },
  action = {}
) {

  switch (action.type) {
    case FAVORITES.set: {
      let list = [...state.list];
      console.log()
      find(list, action.favorite) ? remove(list, action.favorite) : list = [...list, action.favorite]

      return {
        ...state,
        list
      }
    }


    default: return state;
  }
}