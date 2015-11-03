var express = require('express');
var router = express.Router();
var request = require('request');

var url = 'https://api.instagram.com/oauth/access_token';

/* GET users listing. */
router.get('/', function (req, res, next) {

	var code = req.query.code;
	var data = {
		client_id: 'b5dfa716548d4801bb638e9b865ff82c',
		client_secret: '7dc5967d14a34817a13519ba7308cd3d',
		grant_type: 'authorization_code',
		redirect_uri: 'http://localhost:1984/authorize/',
		code: code
	};

	if(code) {
		request({uri: url,method: "POST",form: data}, function (error, response, body) {
					res.cookie('auth',body, { maxAge: 7 * 24 * 3600000 });
            res.redirect('/');

		});
	} else {
		res.render('authorize', {
			title: 'Authorize App',
            redirect_uri:data.redirect_uri,
            client_id:data.client_id

		});
	}

});

module.exports = router;
