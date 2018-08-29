const React = require('react');
const ReactDOM = require('react-dom');

const SSR = <button onClick={() => alert('hello!')}>Hello world!?</button>;

// Render only in the browser, export otherwise
if (typeof document === 'undefined') {
  module.exports = SSR;
} else {
  ReactDOM.hydrate(SSR, document.getElementById('app'));
}
