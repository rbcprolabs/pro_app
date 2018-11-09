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

    return result;
  },

  splitAction(text, symbol) {
    return text.split(symbol).map(item => item.trim())
  },

  clearSimilarTags(array) {
    array.map(item => {
      this.splitAction(item.fullTerm, '/')
    });

    return array
  }

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