var express = require('express');
var router = express.Router();
const Cust = require('../db/login');

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

	router.post('/', function(req, res, next) {
			if(req.session.user==undefined){
				res.redirect('/');
			}
			else{
				const user = {
					id: req.body.id,
			    username: req.body.username,
					email: req.body.email,
					date: req.body.date,
					phone: req.body.phone
			  };
				Cust
				.update(user)
				.then(result=>{
					Cust.getId(req.body.id).then(
	          guest=> {
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
							res.render('account',{user});
					});
				});
			}
		});
module.exports = router;
