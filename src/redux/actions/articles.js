import { ARTICLES } from '../types';
import uuid from 'uuid/v1';
import Contentful from 'app/bootstrap/Contentful';
import Formatter from 'app/services/Formatter';


export const getArticles = () => dispatch =>

  Contentful().getEntries({
    'content_type': 'article'
  })
    .then(
      resp => {
        console.log('resp ', resp)
        const list = [];

        resp.items.map(item => {
          const { fields } = item;
          fields.tags = [];


          fields.id = uuid();

          fields.companies ? fields.tags=[...fields.tags, ...Formatter.createTags(fields.companies)] : false;
          fields.persons ? fields.tags=[...fields.tags, ...Formatter.createTags(fields.persons)] : false;
          fields.indicators ? fields.tags=[...fields.tags, ...Formatter.createTags(fields.indicators)] : false;
          fields.industries ? fields.tags=[...fields.tags, ...Formatter.createTags(fields.industries)] : false;
       
          list.push(fields);
        })

        dispatch({
          type: ARTICLES.get,
          list
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