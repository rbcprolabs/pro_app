import { CATEGORIES } from '../types';
import api from '../api';

export const getCategories = (params) => (dispatch) =>
  api.categories.get(params)
    .then(
      resp => {
        console.log('resp category ', resp)
        dispatch({
          type: CATEGORIES.get,
          categories: resp.categories
        })
      }
    )
    .catch(
      fail => {
        dispatch({
          type: CATEGORIES.get,
          categories: fail
        })
      }
    );

export const getCategoriesById = (params) => (dispatch) =>
  api.categories.get_by_id(params)
    .then(
      resp => {
        console.log('resp subcategory ', resp)
        dispatch({
          type: CATEGORIES.get_by_id,
          categories: resp.categories
        })
      }
    )
    .catch(
      fail => {
        dispatch({
          type: CATEGORIES.get_by_id,
          categories: fail
        })
      }
    );
