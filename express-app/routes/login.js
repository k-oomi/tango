var express = require('express');
var router = express.Router();
const mysql = require('mysql');

let connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'tester',
  password: 'k2akiks',
  port: 8889,
  database: 'tango'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('DB_access OK');
});

router.get('/', function (req, res, next) {
  if(req.session.data == undefined){
    req.session.data = [];
  }
  let opt = {
    err_message: null,
    data: req.session.data
  }
  res.render('login', opt);
});

router.post('/', function (req, res, next) {
  let opt = {
    err_message: null
  }
  let sql = "select * from user where mailadd=? and password=?";
  let data = [req.body.username, req.body.password];
  connection.query(sql, data, function (err, results, fields) {
    if (err) throw err;
    if(results.length > 0){
      req.session.data.unshift(results[0].id);
      res.redirect('/personal');
    }else{
      let opt = {
        err_message: 'ユーザー名かパスワードが間違っています'
      }
      res.render('login', opt);
    }
  });
});

module.exports = router;
