var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.data != undefined){
    if (req.session.data[0] > 0) {
      res.render('personal', {});
    }
  }else{
    res.redirect('/common');
  }
  
});

module.exports = router;
