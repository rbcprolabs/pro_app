import axios from 'axios';
import Contentful from 'app/bootstrap/Contentful';

export default {

  articles: {
    get: () =>
      Contentful().getEntries({
        content_type: 'articles',
        order: '-fields.published'
      })
  },

  cards: {
    get: () =>
      Contentful().getEntries({
        content_type: 'cards',
        order: '-fields.published'
      })
  },

  categories: {

    get: data => {
      return axios({
        data: {
          getType: "getCategories",
          ...data,
        }
      })
        .then(res => res)
        .catch(() => {
          return Promise.reject({
            'status': false,
            'description': 'Ошибка получения категорий'
          });
        });
    }
  }
}