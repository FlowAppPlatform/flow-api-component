const axios = require('axios');

module.exports = class Axios {
  
  constructor(url, params) {
    this.instance = axios.create({
      url: url,
      params: params,
      timeout: 5000
    });
  }

  request() {
    return this.instance.request({});
  }
  
};