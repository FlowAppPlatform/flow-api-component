const Flow = require('flow-platform-sdk');

/*
 * 
 * This class is a general API Component class
 * 
 * The class takes properties common to all components,
 * - 'URL', a string
 * - 'Headers'
 * - 'Data' ('Params')
 * The class emits ports common to all components,
 * - 'Failed' or 
 * - 'Complete' with the 'Response'
 * 
 */
class APIComponent extends Flow.Component {
  constructor(name) {
    
    super();
    this.name = name;

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

  }
}

module.exports = APIComponent;