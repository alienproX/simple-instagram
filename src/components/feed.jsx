var React = require('react');
var $ = require('./../lib/tools.jsx');
var Auth = require('./../lib/auth.jsx');
var Media = require('./media.jsx');
var loadStatus = false;

var Feed = React.createClass({
	getInitialState: function() {
		return {
			mediaList: [],
			pagination:{}
		};
	},
	componentDidMount: function() {
		$.jsonp(Auth.url+'/users/self/feed?access_token='+ Auth.token,this.renderFeed)
	},
    renderFeed: function(result){
        if (this.isMounted()) {
            this.setState({
                mediaList: this.state.mediaList.concat(result.data),
                pagination: result.pagination
            });
        }
    },
	componentWillMount: function(){
		$.loadStart();
	},
	componentDidUpdate: function() {
		$.loadEnd();
	},
	loadMore: function(url) {
		if(loadStatus) return;
		loadStatus = true;
		document.querySelector('.loadmore').className = 'loadmore loading';
		$.jsonp(url,this.moreFeed);
	},
    moreFeed: function(result){
        this.setState({
            mediaList: this.state.mediaList.concat(result.data),
            pagination: result.pagination
        });
        document.querySelector('.loadmore').className = 'loadmore';
				loadStatus = false;
    },
    showMedia: function(id){
        Media(id);
    },
	render: function() {
		var media = this.state.mediaList || [];
        var loadMore = this.loadMore.bind(this,this.state.pagination.next_url);
		return (
			<div>
				<article className="timeline feed">
					<ul>
						{media.map(function (item) {
                            var showMedia = this.showMedia.bind(this,item.id);
							return <li className="media" id={'media'+item.id} key={item.id}>
									<div>
										<div className="userInfo">
											<a className="user" href={"/user/" + item.user.id}><img className="avatar"  src={item.user.profile_picture}/>
												<b>{item.user.username}</b>
											</a>
											<time title={$.socialTime(item.created_time, true)}>{$.socialTime(item.created_time)}</time>
										</div>
										<div className="mediaArea">
											<div className="mediaText">
												{item.caption ? <p>{item.caption.text}</p> : ''}
											</div>
											<span className={"mediaType " + item.type}  onClick={showMedia}></span>
											<img className="imgView" onClick={showMedia} src={item.link + 'media/?size=l'}/>
										</div>
										<span className={"like icon-heart " + item.user_has_liked} title={item.likes.count + ' Likes'}>{$.formatK(item.likes.count)}</span>
										<span className="comment icon-bubble" title={item.comments.count + ' Comments'}>{$.formatK(item.comments.count)}</span>
										<span className={"location icon-location2 " + (item.location
											? 'true'
											: '')} title={(item.location
											? item.location.name
											: '')}>{(item.location
											? item.location.name
											: '')}</span>
									</div>

									<ul className="commentList">
										{item.comments.data.map(function (comment, index) {
											if (index < 4) {
												return <li  key={comment.id}>
														<div className="avatarArea">
															<img className="avatar" src={comment.from.profile_picture}/>
														</div>
														<p>
															<a className="userLink" href={"/user/" + comment.from.id}>{comment.from.username}</a>:
															{comment.text}
															<span className="time" title={$.socialTime(comment.created_time, true)}>{$.socialTime(comment.created_time)}</span>
														</p>
													</li>
											}
										})}
										{(item.comments.count > 4
											? <div className="moreComment">
													<a href="javascript:;" onClick={showMedia}>view&nbsp;
														{(item.comments.count - 4)}
														 &nbsp;more comments</a>
												</div>
											: '')}

									</ul>
								</li>
						}, this)}
					</ul>
					<span className="loadmore" onClick={loadMore}>LOAD MORE</span>
				</article>
			</div>
		);
	}
});
module.exports = Feed;
