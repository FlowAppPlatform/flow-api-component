const Axios = require('./axios');
const APIComponent = require('./component');

module.exports = class GetComponent extends APIComponent {
  constructor() {

    super('Get Component');

    // we make request here
    this.attachTask(function () {
      try {

        new Axios(this.getProperty('URL').data, JSON.parse(this.getProperty('Data').data))
          .request()
          .then((response) => {
            this.emitResult(this.getPort('Complete'), response.data);
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