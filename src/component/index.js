const Flow = require('flow-platform-sdk');

/*
 * 
 * This class is a general API Component class
 * 
 * The class takes properties common to all components,
 * - 'URL'
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

    const data = new Flow.Property('Data', 'text');
    
    this.addProperty(url);
    this.addProperty(data);

    const failed = new Flow.Port('Failed');
    const complete = new Flow.Port('Complete');
    
    const response = new Flow.Property('Response', 'text');
    complete.addProperty(response);

    this.addPort(failed);
    this.addPort(complete);

  }

  emitResult(port, response=null) {
    if (port.hasProperty('Response')) {
      try { // store json stringifiable data
        port.getProperty('Response').data = JSON.stringify(response);
      } catch(e) {/* ignore error */}
    }
    port.emit();
    this.taskComplete();
  }
}

module.exports = APIComponent;