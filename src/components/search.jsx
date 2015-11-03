var React = require('react');
var Tools = require('./../lib/tools.jsx');
var Auth = require('./../lib/auth.jsx');

var Search = React.createClass({
	getInitialState: function() {
		return {
			userList: [],
			noResult:''
		};
	},

	componentDidMount: function() {
		Tools.jsonp(Auth.url + "/users/search?q=" + this.props.keyword + '&access_token=' + Auth.token, function(result) {
			if (this.isMounted()) {
				this.setState({
					userList: result.data
				});
				if(result.data.length === 0){
					this.setState({
						noResult: 'No Result!'
					});
				}
			}
		}.bind(this));
	},
	render: function() {
		var userList = this.state.userList || [];
		return (
			<div>
				<h1 className="searchTitle">{"#" + this.props.keyword}</h1>
				<div className="noResult">{this.state.noResult}</div>
				<ul className="searchList">
					{userList.map(function (item) {
						return <li className="searchKid">
								<a href={"/user/" + item.id} title={"@" + item.username}>
									<img src={item.profile_picture}/>
									<b>{item.full_name}</b>
								</a>
							</li>
					})}
				</ul>
			</div>
		);
	}
});

module.exports = Search;
