import { ARTICLES } from '../types';
import Contentful from 'app/bootstrap/Contentful'


export const getArticles = () => dispatch =>

  Contentful().getContentType('article')
    .then(
      resp => {
        console.log('resp ', resp)
        dispatch({
          type: ARTICLES.get,
          list: resp.list
        })
      }
    )
    .catch(
      fail => {
        console.log('fail ', fail)
        dispatch({
          type: ARTICLES.get,
          list: fail
        })
      }
    );