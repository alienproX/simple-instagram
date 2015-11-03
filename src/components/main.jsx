var React  = require('react');
var Header  = require('./header.jsx');

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <Header avatar={this.props.avatar} name={this.props.name}  uid={this.props.uid}/>
        <div className="main" id="main">
        </div>
        <div id="playground"></div>
      </div>
    );
  }
});

module.exports = Main;
