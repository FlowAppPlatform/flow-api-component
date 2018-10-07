# Flow API POST component
The npm package contains components for making API requests. The components are designed to work with Flow SDK

*To use a component, install the package in your NodeJS project*

```
npm install flow-api-component --save
```

*Use the component as below*

```javascript
// require the component
const Component = require('flow-api-component');

// create instance of the POST component for example
const component = new Component.POST();
```

*Provide url, headers and any data to pass*

```javascript
// absolute url to your endpoint e.g. https://localhost/clans
component.getProperty('URL').data = 'Your Endpoint';
component.getProperty('Data').data = {
  'name': 'Marin Trump', role: 'Knight'
};
// this is optional
component.getProperty('Headers').data = {
  'X-Requested-With': 'XMLHttpRequest'
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

And that's the Flow API POST component.

Also check, the [GET](./get.md), [PUT](./put.md), [DELETE](./delete.md)  components.