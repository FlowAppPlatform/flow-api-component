# Flow API POST component
*To get started, install the package in your NodeJS project*

```
npm i flow-api-component --save
```

*Use the component as below*

```javascript
// require the component
const Component = require('flow-api-component');

// create instance of the POST component
const component = new Component.POST();
```

*Provide url, headers and any data to pass*

```javascript
// absolute url to your endpoint e.g. https://localhost/clans
component.getProperty('URL').data = 'Your endpoint';
component.getProperty('Data').data = {
  'name': 'Marin Trump', role: 'Knight'
};
component.getProperty('Headers').data = {
  'X-Requested-With': 'XMLHttpRequest'
};
```

*Listen in for port emit events*
```javascript
component.getPort('Complete').onEmit(function() {
  // request was successfully made
  const port = this.getPort('Complete');
  // the response can be accessed through properties of the port
  const statusCode = port.getProperty('StatusCode').data;
  const statusText = port.getProperty('StatusText').data;
  const responseHeaders = port.getProperty('Headers').data;
  const responseData = port.getProperty('Data').data;
  // or the whole response object
  const response = port.getProperty('Response').data;
});

component.getPort('Failed').onEmit(function() {
  // an error occured
  // the actual error can be accessed through the 'Data' property of the port
  let err = component.getPort('Failed').getProperty('Data').data;
});
```

*Execute the component*
```javascript
// add the component to a graph before executing it
const Graph = require('flow-platform-sdk').Graph;
new Graph("graph-1").addComponent(component);

component.execute();
```

#### Conclusion

That's the Flow API POST component. Also check, the [GET](./get.md), [PUT](./put.md), [DELETE](./delete.md)  components.