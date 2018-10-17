import { CATEGORIES } from '../types';

export default function categories(
  state = {
    all: [],
    subcategories:[],
    active: {
      category_id: {},
      product_id: ""
    }
  },
  action = {}
) {
  // console.log('action categories ', action)
  switch (action.type) {
    case CATEGORIES.get: {
      return {
        ...state,
        all: [...action.categories]
      }
    }

    case CATEGORIES.get_by_id: {
      return {
        ...state,
        // active: {
        //   // ...state.active,
        //   // subcategories: action.categories
        // }
      }
    }


    default: return state;
  }
}