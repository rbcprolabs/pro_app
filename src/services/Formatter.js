const Formatter = {

  firstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
  createTags(data) {
    const test = [];
    const convertComma = data.split(',').map(item => item.trim());
    const convertDots = convertComma.map(tag => tag.split(':').map(item => item.trim()));
    const convertDot = convertDots.map(item => item.map(tag => tag.split('.').map(i => test.push(i))));
    const result = [];
    // console.log('convertDots ', convertDots)
    // console.log('test ', test)
    // console.log('convertDot ', convertDot)

    const res1 = this.convertText(data, ',');
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
    // if(res2.length>1){


    //   result.push({
    //     text: res2[0],
    //     description: res2[1]
    //   })
    // }else{
    //   result.push({
    //     text: res2[0],
    //   })
    // }
    // res2.map(item => item.length > 1
    //   ?
    //   result.push({
    //     // text: this.firstLetterUpperCase(item[0]),
    //     // description: this.firstLetterUpperCase(item[1])
    //     text: item[0],
    //     description: item[1]
    //   })
    //   :
    //   result.push({
    //     // text: this.firstLetterUpperCase(item[0])
    //     text: item[0]
    //   })
    // );

    return result;
  },

  convertText(data, symbol) {
    const result = [];
    const splitAction = (text) => {
      // if(text.indexOf(symbol) > -1){
      result.push(text.split(symbol).map(item => item.trim()))
      // }else{
      //   result.push(text)
      // }
    }
    if (typeof data == 'object') {
      data.map(tag => {
        // if (tag[0].indexOf(symbol) > -1) {
          tag.map(item => splitAction(item))
        // } else {
        //   // TODO: пофиксить баг с парсингом
        //   // tag.map(item => result.push(item))
        // }
      })
      // data.map(tag=>splitAction(tag))
    } else {
      splitAction(data)
    }
    return result
  }
}

export default Formatter;