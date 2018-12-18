import { FOLLOW } from '../types';
import { find, remove } from 'lodash';
import AsyncStorage from 'app/services/AsyncStorage';


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
      
      AsyncStorage.set('follow', list);
      
      return {
        ...state,
        list
      }
    }


    default: return state;
  }
}