import { FOLLOW } from '../types';
import { find, remove } from 'lodash';


export default function follow(
  state = {
    list: [],
  },
  action = {}
) {

  switch (action.type) {
    case FOLLOW.set: {
      let list = [...state.list];

      find(list, action.follow) ? remove(list, action.follow) : list = [...list, action.follow]

      return {
        ...state,
        list
      }
    }


    default: return state;
  }
}