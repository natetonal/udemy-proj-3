var React = require('react');
var Day = require('./Day.jsx');
var HTTP = require('../services/httpservice');

var Forecast = React.createClass({
    getInitialState: function() {
        var city = this.props.city ? this.props.city : "Las Vegas";
        var country = this.props.country ? this.props.country : "us";
        var units = this.props.units ? this.props.units : "imperial";
        var apiKey = "5b062ab832ff7ba990c325a2467c7915";
        var url = city + "," + country + "&units=" + units + "&appid=" + apiKey;
        return {
            weather: "",
            city: city,
            country: country,
            units: units,
            apiKey: apiKey,
            url: url,
            colors: ["#ec4444","#79b8af","#e6834f","#a6a539","#f27e7e"]
        };
    },
    // component is ready to go. This is where web requests are made
    componentDidMount: function(){
        var generateURL = function(){
            return "q=" + this.state.url;
        }.bind(this);

        var displayDay = function(epoch){
            var date = new Date(epoch * 1000);
            return dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
        };

        HTTP.get(generateURL())
        // this is where the JSON data comes in from the server
        .then(function(json){
            // group incoming forecast data by day (hopefully)
            var items = json.list,
                days = [],
                day = [],
                lastDay = "",
                thisDay = "";

            for(var index in items) {
                lastDay = index == 0 ? displayDay(items[index].dt) : thisDay;
                thisDay = displayDay(items[index].dt);
                if(lastDay !== thisDay){
                    days.push(day);
                    day = [];
                };

                day.push(items[index]);
            };
            this.setState({weather: days});
        }.bind(this));
        // Usually wil need to bind returned data to "this" (the component).
    },

    render: function() {


        if(!this.state.weather){
            return <div>Loading...</div>
        } else {
            var forecastDays = this.state.weather.map(function(item, index){
                return <Day
                        key={"day_" + item[index].dt}
                        date={item[index].dt}
                        units={this.state.units}
                        whichDay={index}
                        weather={item}
                        days={this.state.weather.length}
                        color={this.state.colors[index]} />;
            }.bind(this));

            var spacer = this.state.weather.length == 5 ? "col-xs-0 col-md-1" : "col-xs-0";

            var mainRowHeight = {
                marginTop: 10,
                marginBottom: 10
            };

            var spacerHeight = {
                height: 25,
            };

            var headerStyle = {
                fontWeight: 300,
                paddingTop: 10,
                paddingBottom: 10,
                fontSize: 40,
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.5)",
                boxShadow: "2px 2px 4px 1px rgba(0,0,0,0.4)",
                textAlign: "center"
            };

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 style={headerStyle}>5-Day Forecast for {this.state.city}, {this.state.country.toUpperCase()}</h1>
                        </div>
                    </div>
                    <div style={mainRowHeight} className="row">
                        <div style={spacerHeight} className={spacer}></div>
                        {forecastDays}
                        <div style={spacerHeight} className={spacer}></div>
                    </div>
                </div>
            );
        }
    }
});

module.exports = Forecast;
