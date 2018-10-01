var Component = require('./src/component');

describe(`Component Tests
`, function () {
  const component = new Component('API Component');
  it('Component should have all required properties', function (done) {
    try {
      component.getProperty('URL');
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

return;

const axios = require('axios');

axios.get('https://www.google.com/')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });

/* const h = require('https');

fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  }); */