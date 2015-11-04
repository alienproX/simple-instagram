function two(num) {
	return num > 9
		? num
		: '0' + num;
}
var tools = {
	get: function(url) {
		return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.open('GET', url);
			req.onload = function() {
				if (req.status == 200) {
					resolve(req.response);
				} else {
					reject(Error(req.statusText));
				}
			};
			req.onerror = function() {
				reject(Error("Network Error"));
			};
			req.send();
		});
	},
	socialTime: function(date, full) {
		if (!date)
			return;
		if (full) {
			var time = new Date(date * 1000);
			return time.getFullYear() + '-' + two(time.getMonth() + 1) + '-' + two(time.getDate()) + ' ' + two(time.getHours()) + ':' + two(time.getMinutes()) + ':' + two(time.getSeconds());
		}
		var seconds = Math.floor(((new Date().getTime() / 1000) - date)),
			interval = Math.floor(seconds / 31536000);
		if (interval > 1)
			return interval + " years";

		interval = Math.floor(seconds / 2592000);
		if (interval > 1)
			return interval + " mons";

		interval = Math.floor(seconds / 86400);
		if (interval >= 1)
			return interval + " days";

		interval = Math.floor(seconds / 3600);
		if (interval >= 1)
			return interval + " hrs";

		interval = Math.floor(seconds / 60);
		if (interval > 1)
			return interval + " mins";

		return Math.floor(seconds) + " secs";
	},
	formatK: function(num) {
		return num > 999
			? (num / 1000).toFixed(1) + 'k'
			: num
	},
	jsonp: function(url, callback) {
		var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
		window[callbackName] = function(data) {
			delete window[callbackName];
			document.body.removeChild(script);
			callback(data);
		};
		var script = document.createElement('script');
		script.src = url + (url.indexOf('?') >= 0
			? '&'
			: '?') + 'callback=' + callbackName;
		document.body.appendChild(script);
	},
	loadStart: function() {
		document.getElementById('playground').innerHTML = '<div class="loadingWrap"><div class="loading"></div></div>';
	},
	loadEnd: function() {
		document.getElementById('playground').innerHTML = '';
	}
};
module.exports = tools;
