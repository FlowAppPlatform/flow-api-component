const Flow = require('flow-platform-sdk');

/*
 * 
 * This class is a general API Component class
 * 
 * The class takes properties common to all components,
 * - 'URL'
 * The class emits ports common to all components,
 * - 'Failed' or 
 * - 'Complete' with the 'Response'
 * 
 */
class Component extends Flow.Component {
  constructor(name) {
    
    super();
    this.name = name;

    const url = new Flow.Property('URL', 'url');
    url.required = true;

    this.addProperty(url);

    const failed = new Flow.Port('Failed');
    const complete = new Flow.Port('Complete');
    
    const response = new Flow.Property('Response', 'text');
    complete.addProperty(response);

    this.addPort(failed);
    this.addPort(complete);

  }

  emitResult(port, response=null) {
    if (port.hasProperty('Response'))
      port.getProperty('Response').data = response;
    port.emit();
    this.taskComplete();
  }
}

module.exports = Component;