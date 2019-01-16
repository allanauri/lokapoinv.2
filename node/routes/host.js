var express = require('express');
var router = express.Router();
var credentials = require('../credentials.json');

/* GET home page. */
router.get('/', function(req, res, next) {
			res.render('host');
});
router.post('/', function(req, res, next) {
  if(req.body.email && req.body.nama && req.body.alamat && req.body.phone && req.body.nama_pro && req.body.alamat_pro){
    var send = require('gmail-send')({
      user: credentials.user,           // Your GMail account used to send emails
      pass: credentials.pass,           // Application-specific password
      to:   credentials.user,           // Send to yourself
      subject: 'Host Request',
      html:    'Saya yang bernama : ' + req.body.nama +
               '<br> Dengan biodata singkat sebagai berikut : <br> Email : ' + req.body.email +
               '<br> Alamat : ' + req.body.alamat +
               '<br> No.Telp : ' + req.body.phone +
               '<br> Mengisi biodata dengan sebenar-benarnya dan bermaksud untuk bergabung menjadi mitra Lokapoin dengan ringkasan properti sebagai berikut : <br> Nama Properti : ' + req.body.alamat +
               '<br> Alamat Properti : ' + req.body.alamat_pro +
               '<br> Demikian, mohon pertimbangannya dan atas perhatiannya saya mengucapkan terimakasih ',  // Plain text
    })({});
    var send2 = require('gmail-send')({
      user: credentials.user,           // Your GMail account used to send emails
      pass: credentials.pass,           // Application-specific password
      to:   req.body.email,           // Send to yourself
      subject: 'Host Request',
      html:    'Rangkuman permohonan anda: ' +
               '<br> Saya yang bernama : ' + req.body.nama +
               '<br> Dengan biodata singkat sebagai berikut : <br> Email : ' + req.body.email +
               '<br> Alamat : ' + req.body.alamat +
               '<br> No.Telp : ' + req.body.phone +
               '<br> Mengisi biodata dengan sebenar-benarnya dan bermaksud untuk bergabung menjadi mitra Lokapoin dengan ringkasan properti sebagai berikut : <br> Nama Properti : ' + req.body.alamat +
               '<br> Alamat Properti : ' + req.body.alamat_pro +
               '<br> Demikian, mohon pertimbangannya dan atas perhatiannya saya mengucapkan terimakasih ',  // Plain text
    })({});
    console.log("email terkirim");
      res.json({
        alert: "Request was made, check your email!"
      });
  }
  else{
    res.json({
      alert: "Please fill the form first!"
    });
  }
});

module.exports = router;
