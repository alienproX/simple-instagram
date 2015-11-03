var React = require('react');
var $ = require('./../lib/tools.jsx');
var Auth = require('./../lib/auth.jsx');

var defaultMedia = {
  user:{
    profile_picture:'',
    username:''
  },
  comments:{count:''}
}

var Media = React.createClass({
    getInitialState: function() {
        return {
            media:{},
            comments:[],
            commentHeight:{}
        };
    },
    componentDidMount: function() {
      $.jsonp(Auth.url+'/media/' + this.props.id + '/comments?access_token='+ Auth.token, this.renderComment);
      $.jsonp(Auth.url+'/media/' + this.props.id + '?access_token='+ Auth.token,this.renderMedia);
    },
    renderMedia: function(result){
        if (this.isMounted()) {
          this.setState({
            media: result.data
          });
        }
        var contentHeight = document.querySelector('.des').clientHeight;
        this.setState({
          commentHeight:{top:(contentHeight + 104) + 'px',opacity:1}
        });
    },
    renderComment: function(result){
        if (this.isMounted()) {
          this.setState({
            comments: result.data
          });
        }
    },
    closeMedia: function(){
      document.querySelector('.mediaContent').className += ' fadeOutDown animated';
      setTimeout(function() {
        React.render(<div></div>, document.getElementById('playground'));
        document.body.style.overflow = 'auto';
      },500);
    },
    addComment: function(){
      document.querySelector('.addCommentForm input').focus();
    },
	render: function() {
    var media = this.state.media.user ? this.state.media : defaultMedia;
    var comments = this.state.comments || [];
    var addComment = this.addComment;
    var closeMedia = this.closeMedia;
		return (
			<div className='mediaContent fadeInDown animated'>
				<div className="mediaArea">
        {(
          media.videos ?
          <video src={media.videos.standard_resolution.url} controls="controls" autoPlay></video>
          : <img src={media.link ? media.link  + 'media/?size=l' : '/images/ajax-loader.gif'}/>
        )}
        </div>
				<div className='mediaContentRight'>
                <span className='closeMedia' onClick={closeMedia}></span>
					<div className="userInfo">
						<img className="aAvatar" src={media.user.profile_picture ? media.user.profile_picture : '/images/empty.png'} />
						<b>{media.user.username}</b>
						<time>{$.socialTime(media.created_time,true)}</time>
					</div>
                    <div>
                    <p className="des">{media.caption ? media.caption.text : ''}</p>
                    <div className="commentTitle">{media.comments.count} Comments
                    <b onClick={addComment}>Add Comment</b>
                    </div>
                      <ul className="commentList" style={this.state.commentHeight}>
                      {comments.map(function (item) {
                        return  <li key={item.id}>
                        <div className="avatarArea">
                        <img className="avatar" src={item.from.profile_picture} /></div>
                        <p><a className="userLink" href={"/user/" + item.from.id}>{item.from.username}</a>
                        <span>:</span><span>{item.text}</span>
                        <span className="time" title={$.socialTime(item.created_time,true)} >{$.socialTime(item.created_time)}</span></p></li>
                      })}
                      <li>
                      <form className="addCommentForm">
                      <input type="text" placeholder="Add a comment..." />
                      </form>
                      </li>
                      </ul>
                    </div>

				</div>
			</div>
		);
	}
});
var popMedia = function(id) {
	document.body.style.overflow = 'hidden';
	React.render(<Media id={id} />, document.getElementById('playground'));
  setTimeout(function() {
    document.querySelector('.mediaContent').className = 'mediaContent';
},500);
};
module.exports = popMedia;
