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