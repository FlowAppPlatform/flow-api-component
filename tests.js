var Component = require('./src/get');

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
  it('Request should complete successfully', function (done) {
    this.timeout(7000);
    component.getProperty('URL').data = 'https://www.google.com/';
    component.getProperty('Headers').data =
      JSON.stringify({'X-Requested-With': 'XMLHttpRequest'});
    component.getProperty('Data').data =
      JSON.stringify({'q': 'home'});

    component.getPort('Complete').onEmit(function() {
      done();
    });
    component.getPort('Failed').onEmit(function() {
      done(new Error('Request failed'));
    });
    component.execute();
  })
})