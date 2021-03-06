import { ARTICLES } from '../types';
import Formatter from 'app/services/Formatter';
import uuid from 'uuid/v1';

const initialState = {
  list: [],
  basketCards: [],
  mostPopularTags: {},
}

export default function articles(
  state = initialState,
  action = {}
) {
  const {
    type,
    responce,
    content_type,
  } = action;

  let list = [];
  let mostPopularTags = {};
  let basketCards = state.basketCards;
  const addTags = (fields, name, isFalt) => {
    if (!fields[name] || typeof fields[name] !== 'string') return;

    const items = Formatter.createTags(fields[name], isFalt, name);

    fields.parsingData.push({
      type: name,
      items
    })

    fields.parsingDataFiltered.push({
      type: name,
      items: Formatter.clearSimilarTags(items, isFalt)
    })

  }


  if (responce && responce.items) {
    responce.items.map(item => {
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
      Formatter.mostPopular(mostPopularTags[key], 4).then(res => mostPopularTags[key] = res)
    }

    basketCards = Formatter.repeatTags(list);
  }

  const mergeData = (oldData, newData) => {


    if (newData.length > 0) {
      return Formatter.clearSimalarObjects([...oldData, ...newData])
    } else {
      for (let key in newData) {
        if (oldData[key]) {
          oldData[key] = [...newData[key], ...oldData[key]];
        }

        newData[key] = oldData[key] ? [...oldData[key], ...newData[key]] : newData[key];
        newData[key] = Formatter.clearSimalarObjects(newData[key]);
      }

      return newData
    }

  };



  // Merge old and new data
  mostPopularTags = mergeData(state.mostPopularTags, mostPopularTags);
  list = mergeData(state.list, list)
    .sort((a, b) => Formatter.convertDateForSorting(b.published) - Formatter.convertDateForSorting(a.published));

  switch (type) {
    case ARTICLES.get: {
      return {
        mostPopularTags,
        basketCards,
        list
      }
    }

    case ARTICLES.clear: {
      return initialState
    }


    default: return state;
  }
}