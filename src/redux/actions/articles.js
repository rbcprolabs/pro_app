import { ARTICLES } from '../types';
import uuid from 'uuid/v1';
import Contentful from 'app/bootstrap/Contentful';
import Formatter from 'app/services/Formatter';
import { uniqWith, isEqual } from 'lodash';



export const getArticles = () => dispatch =>

  Contentful().getEntries({
    'content_type': 'articles',
    order: '-fields.published'
  })
    .then(
      resp => {
        console.log('resp ', resp)
        const list = [];
        const addTags = (fields, name, isFalt) => {
          if (!fields[name] || typeof fields[name] !== 'string') return;

          const items = Formatter.createTags(fields[name], isFalt);

          fields.parsingData.push({
            type: name,
            items
          })
          fields.parsingDataFiltered.push({
            type: name,
            items: Formatter.clearSimilarTags(items, isFalt)
          })

        }

        resp.items.map(item => {
          const { fields } = item;
          const pars = [
            {
              name: 'industries',
              isFalt: false
            },
            {
              name: 'geography',
              isFalt: false
            },
            {
              name: 'companies',
              isFalt: true
            },
            {
              name: 'people',
              isFalt: true
            },
            {
              name: 'format',
              isFalt: true
            },
            {
              name: 'indicators',
              isFalt: true
            },
            {
              name: 'functions',
              isFalt: true
            },
            {
              name: 'organizations',
              isFalt: true
            },
            {
              name: 'tags',
              isFalt: true
            }
          ];

          fields.parsingData = [];
          fields.parsingDataFiltered = [];
          fields.id = uuid();

          pars.map(item =>
            addTags(fields, item.name, item.isFalt)
          )

          list.push(fields);
        })

        let mostPopularTags = {};

        list.map(article =>
          article.parsingDataFiltered.map(category =>
            category.items.map(item => {
              if (!mostPopularTags[category.type]) {
                mostPopularTags[category.type] = []
              }
              mostPopularTags[category.type].push(item)
            })
          )
        )

        for (let key in mostPopularTags) {
          mostPopularTags[key] = Formatter.mostPopular(mostPopularTags[key], 4)
        }

        dispatch({
          type: ARTICLES.get,
          mostPopularTags,
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