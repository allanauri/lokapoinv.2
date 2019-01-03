var express = require('express');
var router = express.Router();
const Cust = require('../db/login');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user==undefined){
  res.render('index');
  }
  else{
    var user = req.session.user;
    res.render('home',{user});
  }
});

router.get('/logout', function(req, res, next) {
  if(req.session.user==undefined){
  res.render('index');
  }
  else{
    req.session.destroy(function(err){
      res.redirect('/');
    });
  }
});

router.post('/', function(req, res, next) {
  if(req.body.email && req.body.pass == undefined){
    res.render('index');
  }
  else{
    if(req.session.user==undefined){
        Cust.getEmail(req.body.email).then(
          guest=> {
            if(!guest){
              res.json({
  							alert:'Email Tidak terdaftar'
  						});
            }
            else{
              var pass = guest.password_customer;
              if(req.body.pass!==pass){
              res.json({
                alert: 'Email atau password salah'
                });
              }
              else{
                var email = req.body.email;
                var pass = req.body.pass;
                const user = {
                  email,
                  pass
                };
        	  		req.session.user = user;
        	  		console.log(user.email);
        	  		res.render('home',{user});
              }
            }
        });
    	}
    	else{
        var user = req.session.user;
    		res.render('home',{user});
    	}
  }
});

module.exports = router;
