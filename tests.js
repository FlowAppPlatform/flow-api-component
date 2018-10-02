var Component = require('./src/component');

describe(`Component Tests
`, function () {
  const component = new Component('API Component');
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
      component.getPort('Complete').getProperty('Response');
      component.getPort('Failed');
      done();
    } catch(e) { done(new Error('Component missing required ports')); }
  })
})