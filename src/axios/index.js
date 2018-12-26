const axios = require('axios');
const response = require('./mock-response');

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
    /* Support tests to this point */
    if (process.env.NODE_ENV === 'testing') return new Promise(
      resolve => resolve(response)
    );
    const configuration = {
      method: method
    };
    if (method !== 'get') {
      configuration.data = data;
    } else configuration.params = data;
    return this.instance.request(configuration);
  }
  
};