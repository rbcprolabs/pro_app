import { ARTICLES, CARDS } from '../types';
import uuid from 'uuid/v1';
import Contentful from 'app/bootstrap/Contentful';
import Formatter from 'app/services/Formatter';
import { uniqWith, isEqual } from 'lodash';



export const getArticles = () => dispatch =>

  Contentful().getEntries({
    content_type: 'articles',
    order: '-fields.published'
  })
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
  
  Contentful().getEntries({
    content_type: 'cards',
    order: '-fields.published'
  })
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