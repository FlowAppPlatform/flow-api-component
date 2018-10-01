const axios = require('axios');
const APIComponent = require('./component');

module.exports = class GetComponent extends APIComponent {
  constructor() {

    super('Get Component');

    // we make request here
    this.attachTask(function () {
      try {

        axios.get(JSON.parse(this.getProperty('URL')), {
          params: JSON.parse(this.getProperty('Data'))
        })
          .then((response) => {
            this.emitResult(this.getPort('Complete'), response);
          })
          .catch(err => {
            this.emitResult(this.getPort('Failed'));
            throw err;
          });

      } catch(error) {
        this.emitResult(this.getPort('Failed'));
        throw error;
      }
    });

  }
};