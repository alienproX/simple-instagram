var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
	var uid = req.cookies.auth;
	if(!uid) {
		res.redirect('/authorize');
	} else {
		res.render('index', {title: 'Instagram'});
	}
});
module.exports = router;
