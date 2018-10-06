const Axios = require('./axios');
const APIComponent = require('./component');

module.exports = class GetComponent extends APIComponent {
  constructor() {

    super('Get Component');

    // we make request here
    this.attachTask(function () {
      
      new Axios(
        this.getProperty('URL').data,
        this.getProperty('Headers').data
      )
        .request('get', this.getProperty('Data').data)
        .then(response => {
          const port = this.getPort('Complete');
          port.getProperty('Data').data = response.data;
          port.emit();
          this.taskComplete();
        })
        .catch(err => {
          const port = this.getPort('Failed');
          port.getProperty('Data').data = err;
          port.emit();
          this.taskComplete();
          throw err;
        });
    
    });

  }
};