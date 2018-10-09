const Flow = require('flow-platform-sdk');
const Axios = require('./axios');

module.exports = class PostComponent extends Flow.Component {
  constructor() {

    super();
    this.name = 'Post Component';

    const url = new Flow.Property('URL', 'url');
    url.required = true;

    const headers = new Flow.Property('Headers', 'object');
    const data = new Flow.Property('Data', 'object');
    
    this.addProperty(url);
    this.addProperty(headers);
    this.addProperty(data);

    const failed = new Flow.Port('Failed');
    const complete = new Flow.Port('Complete');
    
    const response = new Flow.Property('Data', 'object');
    complete.addProperty(response);
    
    const error = new Flow.Property('Data', 'object');
    failed.addProperty(error);

    this.addPort(failed);
    this.addPort(complete);

    // we make request here
    this.attachTask(function () {
      
      new Axios(
        this.getProperty('URL').data,
        this.getProperty('Headers').data
      )
        .request('post', this.getProperty('Data').data)
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