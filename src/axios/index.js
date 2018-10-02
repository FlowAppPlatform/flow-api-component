const axios = require('axios');

module.exports = class Axios {
  
  constructor(url, headers={}) {
    this.instance = axios.create({
      url: url,
      headers: headers,
      timeout: 5000
    });
  }

  /* one of 'get', 'post', 'put', 'delete' */
  request(method='get', data) {
    const configuration = {
      method: method
    };
    if (method != 'get') {
      configuration.data = data;
    } else configuration.params = data;
    return this.instance.request(configuration);
  }
  
};