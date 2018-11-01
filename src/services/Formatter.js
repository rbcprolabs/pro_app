const Formatter = {

  firstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },

  createTags(list) {
    const result = [];
    const splitDotComma = this.splitAction(list, ';');

    splitDotComma.map((res, i) => {
      const splitSplash = this.splitAction(res, '/');
      const parent = this.firstLetterUpperCase(splitSplash[0]);

      if (splitSplash.length == 1) {

        return result.push({
          term: parent,
          extendedTerm: parent,
          fullTerm: parent,
          level: 0
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
  }
}

export default Formatter;