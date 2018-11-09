import { FAVORITES } from '../types';

export const setFavorite = favorite => dispatch =>
  dispatch({
    type: FAVORITES.set,
    favorite
  })
