import { FOLLOW } from '../types';


export const setFollow = (data) => dispatch =>
  dispatch({
    type: FOLLOW.set,
    follow: data
  })