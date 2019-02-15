const Flow = require('flow-platform-sdk');
const Axios = require('./axios');

module.exports = class PutComponent extends Flow.Component {
  constructor(id = null) {

    super(id);
    this.name = 'Put Component';

    const url = new Flow.Property('URL', 'url');
    url.required = true;

    const headers = new Flow.Property('Headers', 'object');
    const data = new Flow.Property('Data', 'object');
    
    this.addProperty(url);
    this.addProperty(headers);
    this.addProperty(data);

    const failed = new Flow.Port('Failed');
    const complete = new Flow.Port('Complete');
    
    const responseStatusCode = new Flow.Property('StatusCode', 'number');
    complete.addProperty(responseStatusCode);

    const responseStatusText = new Flow.Property('StatusText', 'text');
    complete.addProperty(responseStatusText);

    const responseHeaders = new Flow.Property('Headers', 'object');
    complete.addProperty(responseHeaders);

    const responseData = new Flow.Property('Data', 'object');
    complete.addProperty(responseData);

    const response = new Flow.Property('Response', 'object');
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
        .request('put', this.getProperty('Data').data)
        .then(response => {
          const port = this.getPort('Complete');
          port.getProperty('StatusCode').data = response.status;
          port.getProperty('StatusText').data = response.statusText;
          port.getProperty('Headers').data = response.headers;
          port.getProperty('Data').data = response.data;
          port.getProperty('Response').data = response;
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