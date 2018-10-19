import { ARTICLES } from '../types';
import Contentful from 'app/bootstrap/Contentful'


export const getArticles = () => async (dispatch) =>

  Contentful()
    .then(
      resp => {
        dispatch({
          type: ARTICLES.get,
          list: resp.list
        })
      }
    )
    .catch(
      fail => {
        dispatch({
          type: ARTICLES.get,
          list: fail
        })
      }
    );