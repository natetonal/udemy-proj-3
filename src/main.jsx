var React = require('react');
var ReactDOM = require('react-dom');
var Forecast = require('./components/Forecast.jsx');

ReactDOM.render(<Forecast city="Las Vegas" country="us" units="imperial" />, document.getElementById('main'));
