import { ARTICLES, CARDS } from '../types';
import api from 'app/redux/api';

export const getArticles = () => (dispatch) =>

  api.articles.get()
    .then(
      responce => dispatch({
        type: ARTICLES.get,
        content_type: 'articles',
        responce
      })

    )
    .catch(
      fail => {
        console.log('fail ', fail)
        dispatch({
          type: ARTICLES.get,
          fail
        })
      }
    );



export const getCards = () => dispatch =>

  api.cards.get()
    .then(
      responce => dispatch({
        type: ARTICLES.get,
        content_type: 'cards',
        responce
      })

    )
    .catch(
      fail => {
        console.log('fail get cards', fail)
        dispatch({
          type: ARTICLES.get,
          fail
        })
      }
    );

export const clearArticles = () => dispatch =>

  dispatch({
    type: ARTICLES.clear,
    content_type: 'articles'
  })