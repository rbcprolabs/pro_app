const Formatter = {

  firstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
  createTags(data) {
    const convertComma = data.split(',').map(item => item.trim());
    const convertDots = convertComma.map(tag => tag.split(':').map(item => item.trim()))
    const result = [];

    convertDots.map(item => item.length > 1
      ?
      result.push({
        text: this.firstLetterUpperCase(item[0]),
        description: this.firstLetterUpperCase(item[1])
      })
      :
      result.push({
        text: this.firstLetterUpperCase(item[0])
      })
    );

    return result[0];
  }
}

export default Formatter;