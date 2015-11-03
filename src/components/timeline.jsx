var React = require('react');
var Tools = require('./../lib/tools.jsx');
var Auth = require('./../lib/auth.jsx');
var Media = require('./media.jsx');

var LeftSlide = React.createClass({
	getInitialState: function() {
		return {
			userInfo: {},
			counts: {},
            relationship: ''
		};
	},
	componentDidMount: function() {
		Tools.jsonp(Auth.url + '/users/' + this.props.uid + '/?access_token=' + Auth.token, function(result) {
			if (this.isMounted()) {
				this.setState({
					userInfo: result.data,
					counts: result.data.counts
				});
			}
		}.bind(this));

    Tools.jsonp(Auth.url + '/users/' + this.props.uid + '/relationship?access_token=' + Auth.token, function(result) {
            if(result.meta.code != 200) return;
			if (this.isMounted()) {
                result.data.outgoing_status ==='follows' ? this.setState({relationship: 'FOLLOWING'}) : this.setState({relationship: 'FOLLOW'});
			}
		}.bind(this));

	},

	render: function() {
		var user = this.state.userInfo;
		var counts = this.state.counts;
        var relationship = this.state.relationship;
		document.title = user.full_name;
		return (
			<aside className="leftSlide">
				<div className="profile">
					<img className="avatar" src={user.profile_picture}/>
					<h4>{user.full_name}</h4>
					<p>{user.bio}</p>
					<span className="website">{user.website}</span>
					<button className={relationship} >{relationship}</button>
					<ul>
						<li className="post">
							<i>{counts.media}</i>posts</li>
						<li className="follower">
							<i>{counts.followed_by}</i>followers</li>
						<li className="following">
							<i>{counts.follows}</i>following</li>
					</ul>
				</div>
			</aside>
		);
	}
});

var Timeline = React.createClass({
	getInitialState: function() {
		return {
			mediaList: []
		};
	},
    componentWillMount: function(){
		Tools.loadStart();
	},
    componentDidUpdate: function() {
        Tools.loadEnd();
    },
	componentDidMount: function() {
		Tools.jsonp(Auth.url + '/users/' + this.props.uid +'/media/recent/?access_token=' + Auth.token, function(result) {
			if (this.isMounted()) {
				this.setState({
					mediaList: result.data
				});
			}
		}.bind(this))
	},
	render: function() {
		var media = this.state.mediaList || [];
		return (
			<div>
				<LeftSlide uid={this.props.uid}/>
				<article className="timeline">
					<ul>
						{media.map(function (item) {
							return <li className = "media" key={item.id} >
							<div>
								<span className={"mediaType " + item.type}  onClick={Media.bind(this, item.id)}></span>
								<img className="imgView" src={item.images.low_resolution.url} width="300" height="300" onClick={Media.bind(this, item.id)} />
								<time  title={Tools.socialTime(item.created_time, true)}>{Tools.socialTime(item.created_time)}</time>
								<span className="comment icon-bubble" title={item.comments.count + ' Comments'}>{Tools.formatK(item.comments.count)}</span>
								<span className="like icon-heart" title={item.likes.count + ' Likes'}>{Tools.formatK(item.likes.count)}</span>
							</div>
							</li>

					})}
					</ul>
				</article>
			</div>
		);
	}
});

module.exports = Timeline;
