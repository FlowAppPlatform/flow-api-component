var Graph = require('flow-platform-sdk').Graph;
var Component = require('./src/get');

describe(`Component Tests
`, function () {
  const component = new Component();
  it('Component should have all required properties', function (done) {
    try {
      component.getProperty('URL');
      component.getProperty('Headers');
      component.getProperty('Data');
      done();
    } catch(e) { done(new Error('Component missing required properties')); }
  })
  it('Component should have all required ports', function (done) {
    try {
      const complete = component.getPort('Complete');
      complete.getProperty('StatusCode');
      complete.getProperty('StatusText');
      complete.getProperty('Headers');
      complete.getProperty('Data');
      complete.getProperty('Response');
      component.getPort('Failed').getProperty('Data');
      done();
    } catch(e) { done(new Error('Component missing required ports')); }
  })
  it('Request should complete successfully', function (done) {
    this.timeout(7000);
    component.getProperty('URL').data = 'https://www.google.com/';
    component.getProperty('Headers').data = {'X-Requested-With': 'XMLHttpRequest'};
    component.getProperty('Data').data =
      {'q': 'home'};

    component.getPort('Complete').onEmit(function() {
      done();
    });
    component.getPort('Failed').onEmit(function() {
      done(new Error('Request failed'));
    });
    new Graph('graph-1').addComponent(component);
    component.execute();
  })
})