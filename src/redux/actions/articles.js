import { ARTICLES } from '../types';
import uuid from 'uuid/v1';
import Contentful from 'app/bootstrap/Contentful';
import Formatter from 'app/services/Formatter';


export const getArticles = () => dispatch =>

  Contentful().getEntries({
    'content_type': 'articles'
  })
    .then(
      resp => {
        console.log('resp ', resp)
        const list = [];
        const addTags = (fields, name) => {
          if (!fields[name] || typeof fields[name] !== 'string') return;

          fields.parsingData.push({
            type: name,
            items: Formatter.createTags(fields[name])
          })

        }

        resp.items.map(item => {
          const { fields } = item;
          const pars = [
            'industries',
            'geography',
            'companies',
            'people',
            'format',
            'indicators',
            'functions',
            'organizations',
            'tags',
          ]
          fields.tags = [];
          fields.parsingData = [];
          fields.id = uuid();

          pars.map(name =>
            addTags(fields, name)
          )

          list.push(fields);
        })
        console.log('list ', list)

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