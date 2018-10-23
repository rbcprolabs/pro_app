import axios from 'axios';

export default {

  categories: {

    get: data => {
      const imageProp = {
        image_width: "32",
        image_height: "32",
      }
      return axios({
        data: {
          getType: "getCategories",
          ...imageProp,
          ...data,
        }
      })
        .then(res => res)
        .catch(() => {
          return Promise.reject({
            'status': false,
            'description': 'Ошибка сервера'
          });
        });
    },

    get_by_id: id => {
      const imageProp = {
        image_width: "150",
        image_height: "150",
      }
      return axios({
        data: {
          getType: "getCategories",
          category_id: id,
          ...imageProp,
        }
      })
        .then(res => res.data)
        .catch(() => {
          return Promise.reject({
            'status': false,
            'description': 'Ошибка сервера'
          });
        });
    }
  }
}