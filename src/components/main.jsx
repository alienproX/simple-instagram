var React = require('react');

var Header = React.createClass({
	handleClick: function(e) {
		e.preventDefault();
		var keyword = document.getElementById('kw').value.trim();
		if (keyword) {
			window.location.href = '/search/' + encodeURI(keyword);
		} else {
			return false;
		}
	},
	render: function() {
		return (
			<div className="topBar">
				<header className="header">
					<a className="home icon-home" href="/">Home</a>
					<form>
						<input id="kw" placeholder='Search' type="search"/>
						<button className="icon-search" onClick={this.handleClick}></button>
					</form>
					<span className="logo icon-instagram"></span>
					<span className='user'>
						<a href={'/user/' + this.props.uid}><img src={this.props.avatar}/>{this.props.name}</a>
					</span>
					<a className="setting icon-cog" href="/settings"></a>
				</header>
			</div>
		);
	}
});

var Main = React.createClass({
	render: function() {
		return (
			<div>
				<Header avatar={this.props.avatar} name={this.props.name} uid={this.props.uid}/>
				<div className="main" id="main"></div>
				<div id="playground"></div>
			</div>
		);
	}
});

module.exports = Main;
