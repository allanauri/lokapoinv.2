var express = require('express');
var router = express.Router();
const Ord = require('../db/book');

router.get('/', function(req, res, next) {
  if(req.session.user==undefined){
      if(req.query.category==undefined){
        Ord.getAllHouse().then(result => {
          res.render('house_tmp',{result});
        });
      }else{
        Ord.getCatHouse(req.query.category).then(result => {
          res.render('house_tmp',{result});
        });
      }
    }
    else{
      var user = req.session.user;
      if(req.query.category==undefined){
        Ord.getAllHouse().then(result => {
          res.render('house_tmp2',{result});
        });
      }else{
        Ord.getCatHouse(req.query.category).then(result => {
          res.render('house_tmp2',{user, result});
        });
      }
    }
});
module.exports = router;
