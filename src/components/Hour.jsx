var React = require('react');

var Hour = React.createClass({

    render: function(){

        var color = this.props.offset == true ? "#aaa" : "#eee";

        var rowStyle = {
            background: this.props.bgColor,
            color: this.props.color,
            padding: 5,
            fontSize: 14
        };

        var timeStyle = {
            textAlign: "left"
        };

        var iconStyle = {
            textAlign: "right"
        };

        var tempStyle = {
            textAlign: "center"
        };

        return(
            <div style={rowStyle} className="row">
                <div style={timeStyle} className="col-xs-4">{this.props.time}</div>
                <div style={tempStyle} className="col-xs-4">{Math.floor(this.props.temp) + "°"}</div>
                <div style={iconStyle} className="col-xs-4"><i style={iconStyle} className={this.props.icon}></i></div>
            </div>
        );
    }
});

module.exports = Hour;
