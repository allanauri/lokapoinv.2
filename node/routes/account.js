var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
		if(req.session.user==undefined){
			res.redirect('/');
		}
		else{
			var user = req.session.user;
			res.render('account',{user});
		}
	});

module.exports = router;
