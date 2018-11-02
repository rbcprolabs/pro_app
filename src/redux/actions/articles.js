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
        const addTags = (fields, name, isFalt) => {
          if (!fields[name] || typeof fields[name] !== 'string') return;
          if (fields.title == 'MODERN Вадим Мошкович застроит бывшую промзону СУ-155 в Печатниках') {

            fields.parsingData.push({
              type: name,
              items: Formatter.createTags(fields[name], isFalt)
            })
          }

        }

        resp.items.map(item => {
          const { fields } = item;
          const pars = [
            {
              name: 'industries',
              isFalt: false
            },
            // {
            //   name: 'geography',
            //   isFalt: false
            // },
            // {
            //   name: 'companies',
            //   isFalt: true
            // },
            // {
            //   name: 'people',
            //   isFalt: true
            // },
            // {
            //   name: 'format',
            //   isFalt: true
            // },
            // {
            //   name: 'indicators',
            //   isFalt: true
            // },
            // {
            //   name: 'functions',
            //   isFalt: true
            // },
            // {
            //   name: 'organizations',
            //   isFalt: true
            // },
            // {
            //   name: 'tags',
            //   isFalt: true
            // }
          ];

          fields.tags = [];
          fields.parsingData = [];
          fields.id = uuid();

          pars.map(item =>
            addTags(fields, item.name, item.isFalt)
          )

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