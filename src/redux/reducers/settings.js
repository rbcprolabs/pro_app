import { SETTINGS } from '../types';

export default (
  state = {
    rollout: {},
  },
  action = {}
) => {

  switch (action.type) {
    case SETTINGS.set: {
      return {
        ...state,
        rollout: action.rollout
      }
    }


    default: return state;
  }
}