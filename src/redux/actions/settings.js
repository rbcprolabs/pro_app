import { SETTINGS } from '../types';


export const setSettings = data => dispatch =>
  dispatch({
    type: SETTINGS.set,
    rollout: data
  })