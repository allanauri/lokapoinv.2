var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
	var email = req.body.email;
	var pass = req.body.pass;
	const user = {
		email,
		pass
		};
  if(req.session.user==undefined){
	  	if(req.body.email && req.body.pass == undefined){
	  		res.send('SALAH');
	  	}
	  	else{

	  		req.session.user = user;
	  		console.log(user);
	  		res.render('tes',{user});
	  	}
  	}
  	else{
  		res.render('tes',{user});
  	}
});

module.exports = router;
