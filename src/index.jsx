var React = require('react');
var Main = require('./components/main.jsx');
var Timeline = require('./components/timeline.jsx');
var Feed = require('./components/feed.jsx');
var Settings = require('./components/settings.jsx');
var Search = require('./components/search.jsx');

var Auth = require('./lib/auth.jsx');



React.render(<Main name={Auth.user} avatar={Auth.avatar} uid={Auth.uid} />, document.getElementById('root'));

var main = document.getElementById('main');

function user(u) {
    document.title = 'loading...';
    React.unmountComponentAtNode(main);
	React.render(<Timeline uid={u.params.id}/>, main);
}

function feed() {
	document.title = 'Instagram';
	React.render(<Feed />, main);
}

function settings() {
	document.title = 'Settings';
	React.render(<Settings/>, main);
}

function search(s) {
	var keyword = s.params.keyword;
	document.title = 'Search: ' + keyword;
	React.render(<Search keyword={keyword}/>, main);
}

page.base('');
page('/', feed);
page('/user/:id', user);
page('/settings', settings);
page('/search/:keyword', search);
page();
