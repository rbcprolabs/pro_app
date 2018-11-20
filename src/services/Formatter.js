import { uniqWith, isEqual } from 'lodash';

const Formatter = {

  firstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },

  createTags(list, isFalt) {
    const result = [];
    const splitDotComma = this.splitAction(list, ';');

    splitDotComma.map((res, i) => {
      const splitSplash = this.splitAction(res, '/');
      const parent = this.firstLetterUpperCase(splitSplash[0]);

      if (isFalt) {
        const request = {
          term: splitSplash[0],
          fullTerm: res,
          level: 1
        }

        splitSplash[0].length > 0 ? request.description = splitSplash[1] : splitSplash[1];

        return result.push(request)
      }


      if (splitSplash.length == 1) {

        return result.push({
          term: parent,
          extendedTerm: parent,
          fullTerm: parent,
          level: 1
        })
      }

      splitSplash.reduce((prev, child, i) => {
        const term = this.firstLetterUpperCase(child);
        const beforePath = typeof prev === 'object' ? prev.fullTerm : prev;
        const collected = {
          term,
          extendedTerm: prev !== child ? `${parent}/${term}` : prev,
          fullTerm: prev !== child ? `${beforePath}/${term}` : prev,
          level: i
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
      filtered = array.filter(item => item.level === 1);
    }

    if (filtered.length === 0) {
      filtered = [...array];
    }

    // теперь надо ограничить количество терминов для отображения
    return filtered.splice(0, 2);
  },

  clearSimalarObjects(array){
    return uniqWith(array, isEqual);
  },

  mostPopular(arr, length) {
    const counter = [];

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

    const filtered = counter.sort((a, b) => b.count - a.count).splice(0, length);

    return filtered.map(obj => obj.data);
  },

  repeatTags(list, length = 3) {
    let similarAll = [];
    const result = [];

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
        const id = this.randomFromArray(item.id, 3);
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
  // }
  // clearSimilarTags(array) {
  //   const firstLevels = array.filter(item => item.level == 1);
  //   const removedSimilar = uniqWith(firstLevels, isEqual);
  //   const slashArray = [];

  //   removedSimilar.map(item => {
  //     slashArray.push(this.splitAction(item.fullTerm, '/'))
  //   });

  //   slashArray.map((item, i) =>
  //     slashArray.map((el, indexSecond) => {

  //       // Clear similar for first level
  //       if (item.length == 1
  //         && el.length > 1
  //         && el[0] == item[0]
  //       ) {
  //         removedSimilar.splice(i, 1)
  //       }

  //       // Create two linees
  //       if (i !== indexSecond
  //         && item[1] == el[1]
  //         && slashArray[i].length > 1
  //       ) {
  //         removedSimilar[i].term = slashArray[i][0];
  //         removedSimilar[i].description = slashArray[i][1];
  //       }
  //     })

  //   )

  //   return removedSimilar
  // }

}

export default Formatter;