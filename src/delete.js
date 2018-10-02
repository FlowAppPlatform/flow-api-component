const Axios = require('./axios');
const APIComponent = require('./component');

module.exports = class DeleteComponent extends APIComponent {
  constructor() {

    super('Delete Component');

    // we make request here
    this.attachTask(function () {
      try {

        new Axios(
          this.getProperty('URL').data,
          JSON.parse(this.getProperty('Headers').data)
        )
          .request('delete', JSON.parse(this.getProperty('Data').data))
          .then(response => {
            this.emitResult('Complete', response.data);
          })
          .catch(err => {
            this.emitResult('Failed');
            throw err;
          });

      } catch(error) {
        this.emitResult('Failed');
        throw error;
      }
    });

  }
};