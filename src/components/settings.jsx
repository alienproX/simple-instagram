var React = require('react');
var Settings = React.createClass({
	render: function() {
		return (
			<div className="unauthorized">
				<p>Because of this web application just based on <a href="https://instagram.com/developer/" target="_blank">Instagram API</a>, so you can not do any more things here. the only thing you can do is:
					<a href="https://instagram.com/accounts/manage_access/" className="btn">Revoke access</a>
				</p>
			</div>
		);
	}
});
module.exports = Settings;
