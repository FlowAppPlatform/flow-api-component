# Flow API GET component
*To get started, install the package in your NodeJS project*

```
npm i flow-api-component --save
```

*Use the component as below*

```javascript
// require the component
const Component = require('flow-api-component');

// create instance of the GET component
const component = new Component.GET();
```

*Provide url, headers and any data to pass*

```javascript
component.getProperty('URL').data = 'https://www.google.com/';
component.getProperty('Headers').data = {
  'X-Requested-With': 'XMLHttpRequest'
};
component.getProperty('Data').data = {
  'q': 'home'
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

That's the Flow API GET component. Also check, the [POST](./docs/components/post.md), [PUT](./docs/components/put.md), [DELETE](./docs/components/delete.md)  components.