import { FOLLOW } from '../types';
import { find, remove } from 'lodash';
import AsincStorage from 'app/services/AsincStorage';


export default function follow(
  state = {
    list: [],
  },
  action = {}
) {

  switch (action.type) {
    case FOLLOW.set: {
      let list = [...state.list];

      if (action.follow[0]) {
        return {
          ...state,
          list: action.follow
        }
      }

      find(list, action.follow) ? remove(list, action.follow) : list = [...list, action.follow]
      
      AsincStorage.set('follow', list);
      
      return {
        ...state,
        list
      }
    }


    default: return state;
  }
}