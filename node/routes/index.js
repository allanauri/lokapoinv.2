var express = require('express');
var router = express.Router();
const Cust = require('../db/login');
var credentials = require('../credentials.json');

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

router.get('/konfirmasi', function(req,res,next){
  if(req.query.email==undefined){
    res.redirect('/');
  }else{
    Cust
    .konfirmasi(req.query.email)
    .then(guest=>{
      res.send('<script>window.alert("Email berhasil dikonfirmasi");window.location.href = "/";</script>');
    });
  }
});

router.post('/register', function(req,res,next){
  const user = {
		fname: req.body.fname,
    lname: req.body.lname,
		email: req.body.email,
		password: req.body.pass,
    status: 0
  };

  Cust
  .create(user)
  .then(customer_id =>{
    var send = require('gmail-send')({
      user: credentials.user,           // Your GMail account used to send emails
      pass: credentials.pass,           // Application-specific password
      to:   req.body.email,           // Send to yourself
      subject: 'Email confirmation',
      html:    'Click this link to confirm your email : <br> <a href="http://www.lokapoin.com/konfirmasi?email=' + req.body.email +
               '">click this link</a> ',  // Plain text
    })({});
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
              res.json({"alert":"email tidak terdaftar"});
            }
            else{
              var pass = guest.password_customer;
              if(req.body.pass!==pass){
                res.json({"alert":"Password anda salah"});
              }
              else{
                //console.log(guest.status);
                if(guest.status==0){
                  res.json({"alert":"Harap konfirmasi email anda"});
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
                  //console.log(guest.status);
                  res.render('home',{user});
                }
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
