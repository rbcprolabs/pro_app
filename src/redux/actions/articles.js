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
        const addTags = (fields, name) => {
          const typeIndex = fields.tags.find((item, i) => item.type == name ? i : false);

          if (!fields[name]) return;

          if (typeIndex) {
            fields.tags[typeIndex].push({
              type: name,
              items: [
                ...fields.tags[typeIndex].items,
                ...Formatter.createTags(fields[name])
              ]
            })
          } else {
            fields.tags.push({
              type: name,
              items: Formatter.createTags(fields[name])
            })
          }

        }

        resp.items.map(item => {
          const { fields } = item;

          fields.tags = [];
          fields.id = uuid();

          addTags(fields, 'companies');
          addTags(fields, 'persons');
          addTags(fields, 'indicators');
          addTags(fields, 'industries');

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
          list: []
        })
      }
    );