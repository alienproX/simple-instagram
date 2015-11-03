
var cookie = function(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2)
		return parts.pop().split(";").shift();
}

var authInfo = JSON.parse(decodeURIComponent(cookie('auth')));

var Auth = {
		url:'https://api.instagram.com/v1',
		token: authInfo.access_token,
		user: authInfo.user.full_name,
		avatar: authInfo.user.profile_picture,
		uid: authInfo.user.id

};
module.exports = Auth;
