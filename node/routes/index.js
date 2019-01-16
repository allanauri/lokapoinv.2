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

router.post('/register', function(req,res,next){
  const user = {
		fname: req.body.fname,
    lname: req.body.lname,
		email: req.body.email,
		password: req.body.pass
  };

  Cust
  .create(user)
  .then(customer_id =>{
    res.redirect('/');
  });
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
              res.send("<script>window.alert('Email tidak terdaftar');window.location = '/';</script>");
            }
            else{
              var pass = guest.password_customer;
              if(req.body.pass!==pass){
                res.send("<script>window.alert('Password anda salah');window.location = '/';</script>");
              }
              else{
                var id = guest.id_customer;
                var email = guest.email_customer;
                var name = guest.nama_customer;
                var ttl = guest.ttl_customer;
                var phone = guest.telp_customer;
                var fname = guest.fname_customer;
                var lname = guest.lname_customer;
                var job = guest.job_customer;
                var desc = guest.desc_customer;
                const user = {
                  id,
                  email,
                  name,
                  ttl,
                  phone,
                  fname,
                  lname,
                  job,
                  desc
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
