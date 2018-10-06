const Flow = require('flow-platform-sdk');

/*
 * 
 * This class is a general API Component class
 * 
 * The class takes properties common to all components,
 * - 'URL', a string
 * - 'Headers', a json parceable string
 * - 'Data' ('Params'), a json parceable string
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

    const headers = new Flow.Property('Headers', 'text');
    const data = new Flow.Property('Data', 'text');
    
    this.addProperty(url);
    this.addProperty(headers);
    this.addProperty(data);

    const failed = new Flow.Port('Failed');
    const complete = new Flow.Port('Complete');
    
    const response = new Flow.Property('Response', 'text');
    complete.addProperty(response);

    this.addPort(failed);
    this.addPort(complete);

  }

  emitResult(portName, response=null) {
    const port = this.getPort(portName);
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