// node 預設模組
var path = require('path');

// NPM 模組
var app = require('express')();
var express = require('express');
var partials = require('express-partials');
var static = require('serve-static');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon'); 
var session = require('express-session');   
//var multer  = require('multer');
var formidable = require("formidable");


var fs = require("fs");
var multer  = require('multer');
var uploadsFolder = __dirname + '/uploads/';  // defining real upload path
var upload = multer({ dest: uploadsFolder }); // setting path for multer


// router設定
var page = require('./routes/page');
var users = require('./routes/index');
var routes = require('./routes/users');

// parse application/x-www-form-urlencoded 
// 讓回傳的值可以解析 json與 urlencoded
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true}));
//app.use(multer({ dest: './uploads/'}));
app.use(express.static(path.join(__dirname, 'public')));

// 版型設定
app.use(partials());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 3000));

//設定預設指定目錄
app.use( static( path.join( __dirname, 'public' )));
//app.use('/users', users);
//app.use('/', routes);
//session
app.use(session({secret : "bigcanisgood"}));
app.use(function(req, res, next){
  res.locals.uNum=req.session.uNum;
  next();
});


app.use(bodyParser({uploadDir: './'}));


//預設favicon.ico位置
app.use(favicon(__dirname + '/public/icon.png'));

//路徑設定，有get與post指令
app.get('/', page.index);
app.get('/register', page.register);
app.post('/rSuccess',page.rSuccess);
app.get('/login', page.login);
app.post('/lResult', page.lResult);
app.post("*", function(req, res){
	res.end(JSON.stringify(req.files) + "\n");
});

//session
var sess;
app.get('/',function(req,res){
    sess=req.session;
    sess.uNum;
});


//偵測3000 port
var server = app.listen(app.get('port'), function() {  
  console.log('Listening on port 3000');  
});


var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('upImg'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/file_upload', upload.single('single-file'), function(request, response) {

    var fileName = request.file.img_input; // original file name
    var file = request.file.path; // real file path with temporary name

    // renaming real file to it's original name
    fs.rename(file, uploadsFolder + fileName, function (err) {
      if (err) {
        console.log(err);
        response.json({success:false, message: err});
        return;
      }

      response.json({success:true, message: 'File uploaded successfully', fileName: fileName});
    });
});