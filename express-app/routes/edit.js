var express = require('express');
const fs = require('fs'); //filesystem モジュールを使用する

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.data != undefined){
        if (req.session.data[0] > 0) {
          res.render('edit', {});
        }
      }else{
        res.redirect('/common');
      }
});

router.post('/', function (req, res, next) {
    let opt = {
        err_message: null
    }
    let data = [req.body.data, req.body.name];
    console.log(data);
    //文字の置き換え：+→' '
    result = data[0].replace(/\+/g, ' ');
    console.log("result→" + result);
    //データの後側：'&'以降を切り出す
    //let result_back = result.substring(result.indexOf("&"));
    //console.log("result_back→" + result_back);
    //ファイル名を取得 sliceの開始位置を6文字目で切り抜く
    let fileName = data[1];
    console.log(fileName + "←ファイル名");
    //データの前側：先頭から'&'の間を切り出す
    //let result_front = result.substring(0, result.indexOf("&"));
    //console.log("result_front→" + result_front);
    //*****ファイルを書き込む******************

    fs.writeFile('public/csv/'+fileName, result, (err) => {
        // 書き出しに失敗した場合
        if (err) {
            console.log("エラーが発生しました。" + err)
            throw err
        }
        // 書き出しに成功した場合
        else {
            console.log("ファイルが正常に書き出しされました")
        }
    });
    res.render('edit', {});
});

module.exports = router;