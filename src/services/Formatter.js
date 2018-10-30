const Formatter = {

  firstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
  createTags(list, type) {
    const result = [];

    const res1 = this.convertText(list, ',');
    const res2 = this.convertText(res1, ':');
    const res3 = this.convertText(res2, '.');


    res3.map(item =>
      item.length > 1
        ?
        result.push({
          text: this.firstLetterUpperCase(item[0]),
          description: this.firstLetterUpperCase(item[1])
        })
        :
        result.push({
          text: this.firstLetterUpperCase(item[0]),
        })
    )

    return result;
  },

  convertText(data, symbol) {
    const result = [];
    const splitAction = (text) => {
      result.push(text.split(symbol).map(item => item.trim()))
    }
    if (typeof data == 'object') {
      data.map(tag => {
        tag.map(item => splitAction(item))
      })
    } else {
      splitAction(data)
    }
    return result
  }
}

export default Formatter;