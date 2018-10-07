# Flow API component
The npm package contains components for making API requests. The components are designed to work with Flow SDK

*To use a component, install the package in your NodeJS project*

```
npm install flow-api-component --save
```

*Use the component as below*

```javascript
// require the component
const Component = require('flow-api-component');

// create instance of the GET component for example
const component = new Component.GET();
```

*Provide url, headers and any data to pass*

```javascript
component.getProperty('URL').data = 'https://www.google.com/';
// this is optional
component.getProperty('Headers').data = {
  'X-Requested-With': 'XMLHttpRequest'
};
// this is optional
component.getProperty('Data').data = {
  'q': 'home'
};
```

*Listen in for port emit events*
```javascript
component.getPort('Complete').onEmit(function() {
  // request was successfully made
  // the response can be accessed through the 'Data' property of the port
  let response = component.getPort('Complete').getProperty('Data').data;
});

component.getPort('Failed').onEmit(function() {
  // an error occured
  // the actual error can be accessed through the 'Data' property of the port
  let err = component.getPort('Failed').getProperty('Data').data;
});


// mandatory to execute the component
component.execute();
```

#### Conclusion

And that's the Flow API GET component.

Also check, the [POST](./components/post.md), [PUT](./components/put.md), [DELETE](./components/delete.md)  components.