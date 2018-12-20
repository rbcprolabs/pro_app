import { uniqWith, isEqual } from 'lodash';
import moment from 'moment';
import AsyncStorage from 'app/services/AsyncStorage';

const Formatter = {

  firstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },

  createTags(list, isFalt, type) {
    const result = [];
    const splitDotComma = this.splitAction(list, ';');

    splitDotComma.map((res, i) => {
      const splitSplash = this.splitAction(res, '/');
      const parent = this.firstLetterUpperCase(splitSplash[0]);

      if (isFalt) {
        const request = {
          term: splitSplash[0],
          fullTerm: res,
          level: 1,
          type
        }

        //splitSplash[0].length > 0 ? request.description = splitSplash[1] : splitSplash[1];

        if (splitSplash[1]) {
          request.description = splitSplash[1]
        }

        return result.push(request)
      }


      if (splitSplash.length == 1) {

        return result.push({
          term: parent,
          extendedTerm: parent,
          fullTerm: parent,
          level: 1,
          type
        })
      }

      splitSplash.reduce((prev, child, i) => {
        const term = this.firstLetterUpperCase(child);
        const beforePath = typeof prev === 'object' ? prev.fullTerm : prev;
        const collected = {
          term,
          extendedTerm: prev !== child ? `${parent}/${term}` : prev,
          fullTerm: prev !== child ? `${beforePath}/${term}` : prev,
          level: i,
          type
        };

        result.push(collected)

        return collected
      }, splitSplash[0])

    })

    const uniqueTermsFilter = (acc, val) => acc.findIndex(i => i.fullTerm === val.fullTerm) === -1 ? [...acc, val] : [...acc];

    return result.reduce(uniqueTermsFilter, []);
  },

  splitAction(text, symbol) {
    return text.split(symbol).map(item => item.trim())
  },

  clearSimilarTags(array, isFlat) {
    let filtered = [];

    if (!array.length) {
      return array
    }

    if (!isFlat) {
      // надо оставить только второй уровень. Держим в уме, что если ни одного элемента 2-го уровня не нашли, то в array только первый уровень
      filtered = array.filter(item => item.level === 1)
    }

    if (filtered.length === 0) {
      filtered = [...array]
    }

    // теперь надо ограничить количество терминов для отображения
    return filtered.splice(0, 2)
  },

  clearSimalarObjects(array) {
    return uniqWith(array, isEqual);
  },

  async mostPopular(arr, length) {
    const counter = [];
    const rollout = await this.rollout();

    arr.map(item => {
      const index = counter.findIndex(obj => isEqual(obj.data, item));

      if (index >= 0) {
        counter[index].count += 1;
      } else {
        counter.push({
          data: item,
          count: 0
        })
      }
    })

    return counter
      .sort((a, b) => b.count - a.count)
      .filter(el => el.count + 1 >= rollout.RecommendedTagArticlesThreshold)
      .splice(0, length)
      .map(obj => obj.data)
  },

  repeatTags(list) {
    const result = [];
    // const length =  ? AsyncStorage.get('rollout').ArticlesListTermsLimit : 3
    const length = 3;
    let similarAll = [];
    // const test = await this.rollout();
    // console.log('test this.rollout', test)

    list.forEach(item => {
      item.parsingDataFiltered.forEach(el => {
        if (el.type !== 'geography') {

          el.items.forEach(tag => {
            const tagString = JSON.stringify(tag);
            const index = similarAll.findIndex(resItem => resItem.tag == tagString);

            if (index < 0) {
              similarAll.push({
                id: [item.id],
                type: el.type,
                tag: tagString,
              })
            } else {
              similarAll[index].id.push(item.id)
            }

          })
        }

      })
    });

    similarAll
      .sort((a, b) => b.id.length - a.id.length)
      .splice(0, length)
      .map(item => {
        const id = this.randomFromArray(item.id, length);
        const articles = [];

        id.map(id => {
          const article = list.find(item => item.id == id);

          if (article) {
            articles.push(article)
          }
        })

        result.push({
          id: id,
          tag: JSON.parse(item.tag),
          type: item.type,
          articles: articles,
        })
      })

    return result
  },

  randomFromArray(arr, count = 1) {
    const indexes = [];
    const getRandomIndex = (selectedIndexes) => {
      const index = Math.floor(arr.length * Math.random());
      const findIndex = selectedIndexes.find(el => el == index);

      return findIndex ? getRandomIndex(selectedIndexes) : selectedIndexes.push(JSON.stringify(index))
    }

    for (let i = 0; i < count; i++) {
      getRandomIndex(indexes)
    }

    return arr.filter((item, i) =>
      indexes.find(indexSelect =>
        JSON.stringify(i) === indexSelect))
  },

  convertDateForSorting(date) {
    return date ? moment.unix(moment(date).unix()).valueOf() : '000000000000'
  },

  rollout() {
    return AsyncStorage.get('rollout')
  }
}

export default Formatter;