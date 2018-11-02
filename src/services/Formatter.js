import {uniqWith, isEqual} from 'lodash';

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

    this.clearSimilarTags(result)

    return result;
  },

  // convertText(data, symbol) {
  //   let result = [];
  //   const splitAction = (text) => {
  //     result = text.split(symbol).map(item => item.trim())
  //   }
  //   if (typeof data == 'object') {
  //     data.map(tag => {
  //       tag.map(item => splitAction(item))
  //     })
  //   } else {
  //     splitAction(data)
  //   }
  //   return this.splitAction(data, symbol)
  // },

  splitAction(text, symbol) {
    return text.split(symbol).map(item => item.trim())
  },

  clearSimilarTags(array) {
    const result = array.filter(item => item.level == 1);
    console.log('result ', result)
    const test = uniqWith(result, isEqual);
    console.log('test ', test)
    
    // ТУДУ удалить совпадение 1 уровня

    // const test = uniqWith(result, isEqual);
    // console.log('test ', test)

    // console.log('array ', array)
    // array.map((child, i) => {
    //   const prev = array[i - 1];
    //   const next = array[i + 1];
    //   console.log('prev ', prev)
    //   console.log('next ', next)

    //     result.push(child);
    // });
    // array.reduce((prev, child, i) => {
    //   console.log('prev ', prev)
    //   let data = {};
    //   if (child.level == 0 && array[i + 1].level == child.level){

    //     result.push(child);
    //     data = child;
    //   }
    //   // console.log('result ', result)
    //   return prev;
    // }, array[0]);

    // console.log('result ', result)
  }
}

export default Formatter;