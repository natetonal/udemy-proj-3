var React = require('react');
var Hour = require('./Hour.jsx');

var Day = React.createClass({
    render: function() {
        var formatEpoch = function(epoch, type){
            var date = new Date(epoch * 1000);

            var year = date.getFullYear();
            var month = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."][date.getMonth()];
            var dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
            var day = date.getDate();
            var suffix = [1, 21, 31].includes(day) ? "st" : ([2, 22].includes(day) ? "nd" : ([3, 23].includes(day)? "rd" : "th"));
            var hours = date.getHours() > 12 ? date.getHours() - 12 : (date.getHours === 0 ? 12 : date.getHours());
            var amPm = date.getHours() > 11 ? "PM" : "AM";

            if(type == "full"){
                return dayName + ", " + month + " " + day + suffix + ", " + year + " @ " + hours + amPm;
            } else if(type == "time"){
                return hours + amPm;
            } else if(type == "day"){
                return dayName;
            } else if(type == "date"){
                return month + " " + day + suffix;
            } else {
                return dayName + ", " + month + " " + day + suffix;
            };

        };

        var convertPressure = function(pressure) {
            return (pressure / 33.8638866667).toFixed(2);
        };

        var convertWindDirection = function(wind) {
            var compass = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
            return compass[Math.floor(wind / 22.5)];
        };

        var windDirection = convertWindDirection(this.props.weather[0].wind.deg);
        var windUnits = this.props.units == "imperial" ? "mph" : "Knots";
        var windDisplay = windDirection + " @ " + Math.floor(this.props.weather[0].wind.speed) + windUnits;

        var mainPanelStyle = {
            height: "inherit",
            padding: "10px 0 10px 0",
            marginBottom: 10,
            color: "#fff"
        };

        var dayStyle = {
            color: "#fff",
            textAlign: "center",
            fontSize: 28,
            fontWeight: 700,
            paddingTop: 10,
        };

        var dateStyle = {
            fontSize: 16,
            color: "#eee"
        };

        var margins = {
            margin: 5,
            background: "rgba(0,0,0,0.4)",
            opacity: 0.9,
            height: "inherit",
            boxShadow: "2px 2px 4px 1px rgba(0,0,0,0.4)"
        };

        var iconStyle = {
            color: "#ffffaa",
            fontSize: 48,
            paddingTop: 5
        };

        var windIconStyle = {
            color: "#aaffff",
            fontSize: 48,
            paddingTop: 5
        };

        var topPanels = {
            paddingTop: 10,
        };

        var thisDay = "";
        if(this.props.whichDay == 0){
            thisDay = "Today";
        } else if(this.props.whichDay == 1){
            thisDay = "Tomorrow";
        } else {
            thisDay = formatEpoch(this.props.date, "day");
        };

        var iconClass = "wi wi-owm-" + this.props.weather[0].weather[0].id;
        var windIconClass = "wi wi-wind wi-towards-" + windDirection.toLowerCase();
        var boxLayout = this.props.days == 5 ?
                        "col-xs-12 col-md-2 col-md-offset-0" :
                        "col-xs-12 col-md-3";

        var hourly = this.props.weather.map(function(item,index){
            return <Hour
                    key={"hour_" + item.dt}
                    bgColor={index % 2 == 0 ? "#ddd" : "#777"}
                    color={index % 2 == 0 ? "#444" : "#ddd"}
                    temp={item.main.temp}
                    icon={"wi wi-owm-" + item.weather[0].id}
                    time={formatEpoch(item.dt, "time")} />
        }.bind(this));

        console.log("this weather: " + JSON.stringify(this.props.weather[0]));

        return (
            <div style={mainPanelStyle} className={boxLayout}>
                <div style={margins} className="row">
                    <div style={topPanels} className="col-xs-6 col-md-12">
                        <h4 style={dayStyle}>
                            {thisDay}<br />
                            <small style={dateStyle}>{formatEpoch(this.props.date, "date")}</small>
                        </h4>
                    </div>
                    <div style={topPanels} className="text-center col-xs-3 col-md-12">
                        <i style={iconStyle} className={iconClass}></i>
                        <h3>{this.props.weather[0].weather[0].main.toUpperCase()}</h3>
                    </div>
                    <div style={topPanels} className="text-center col-xs-3 col-md-12">
                        <i style={windIconStyle} className={windIconClass}></i>
                        <h3>{windDisplay}</h3>
                    </div>
                    <div className="col-xs-12">
                        {hourly}
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = Day;
