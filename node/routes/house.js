var express = require('express');
var router = express.Router();
var credentials = require('../credentials.json');
const Ord = require('../db/book');

/* GET home page. */
router.get('/', function(req, res, next) {
		if(req.session.user==undefined){
			if(req.query.id==undefined){
				Ord.getAllHouse().then(result => {
					res.render('house_tmp',{result});
				});
			}else{
				Ord.getHouse(req.query.id).then(result => {
					res.render('house',{result});
				});
			}
		}
		else{
			var user = req.session.user;
			if(req.query.id==undefined){
				Ord.getAllHouse().then(result => {
					res.render('house_tmp2',{result});
				});
			}else{
				Ord.getHouse(req.query.id).then(result => {
					res.render('house2',{user, result});
				});
			}
		}
	});

	router.post('/', function(req, res, next) {
			if(req.session.user==undefined){
				//res.send("<script>window.alert('Anda harus login terlebih dahulu!');window.location = '/house';</script>");
				res.json({
					alert: "You need login to requesting a reservation"
				});
			}
			else{
					if(req.body.tamu && req.body.date && req.body.location && req.body.nama_rumah){
					var user = req.session.user;
					var send = require('gmail-send')({
				  	user: credentials.user,           // Your GMail account used to send emails
				  	pass: credentials.pass,           // Application-specific password
				  	to:   user.email,           // Send to yourself
				  	subject: 'Booking Confirmation',
				  	text:    'Thanks for your reservation! We currently evaluate your request on place and time of your booking. We will tell you soon if everything is fine for you to book.',  // Plain text
					})({});
					var send2 = require('gmail-send')({
				  	user: credentials.user,           // Your GMail account used to send emails
				  	pass: credentials.pass,           // Application-specific password
				  	to:   credentials.user,           // Send to yourself
				  	subject: 'Booking Request',
				  	html:    'There is a book request from : ' + user.name +
										 '<br> Guest : ' + req.body.tamu +
										 '<br> Date : ' + req.body.date +
										 '<br> Location : ' + req.body.location +
										 '<br> Property name : ' + req.body.nama_rumah +
										 '<br> Contact him on : ' + user.email +
										 '<br> or : ' + user.phone,  // Plain text
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
				//res.send("<script>window.alert('Reservation was made, check your email!');window.location = '/house';</script>");
			}
		});

		router.post('/cekava', function(req, res, next) {
			const user ={
				tanggal : req.body.tanggal,
				id_rumah : req.body.id_rumah
			}
			Ord.get(user).then(result => {
				if(result){
					res.json({
						alert:"ada"
					});
				}
				else{
					res.json({
						alert:"tidak"
					});
				}
			});
		});
module.exports = router;
