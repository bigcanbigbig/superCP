//首頁

/*****************FIREBASE*****************/
/*****************FIREBASE*****************/
/*****************FIREBASE*****************/

var firebase = require("firebase");
var config = {
   apiKey: "AIzaSyA33Jnuyt58rnNaddr_O8YmsVmrAn1OmhE",
   authDomain: "supercp-a8e9e.firebaseapp.com",
   databaseURL: "https://supercp-a8e9e.firebaseio.com/",
   storageBucket: "supercp-a8e9e.appspot.com"
 };
firebase.initializeApp(config);

var database = firebase.database();
//console.log(database);

var users= new Array();
firebase.database().ref('/user').once('value').then(function(snapshot) {
  users=snapshot.val();
  console.log(users);
});


function register(num, uAccount, uPwd, uName) {
    var point=0;
    var userRef = database.ref('user/'+num);//num?
    userRef.set({
      uAccount: uAccount,
      uPwd: uPwd,
      uName: uName,
      point: point
    });
    firebase.database().ref('/user').once('value').then(function(snapshot) {
      users=snapshot.val();
    });  
}


function loginCheck(uAccount, uPwd){
  firebase.database().ref('/user').once('value').then(function(snapshot) {
    users=snapshot.val();
  });
  for (var i=1;i<=users.length;i++){
    if (uAccount==users[i].uAccount && uPwd==users[i].uPwd){
      return i;
      break;
    }
  }
  return 0;
}


/*****************--------*****************/
/*****************--------*****************/
/*****************--------*****************/

exports.index = function(req, res) {
  res.render('pages/index',{
    message: ""
  });
};

exports.register = function(req, res){
    res.render('pages/register',{
    users: users
  });
};

exports.rSuccess = function(req, res){
  
  num=req.body.num;
  uAccount=req.body.uA;
  uPwd=req.body.uP;
  uName=req.body.uN;

  register(num, uAccount, uPwd, uName);
  res.render('pages/rSuccess',{
    uName: uName
  });
};


exports.login = function(req, res){
  var message="你已登入囉！";
  if (req.session.uNum!=null) {
    res.render('pages/index',{
      uName: users[req.session.uNum].uName,
      message: message
    });
  }else{
    res.render('pages/login');
  }
};
exports.lResult = function(req, res){
  uA=req.body.uA;
  uP=req.body.uP;

  if(loginCheck(uA, uP)==0){
    res.render('pages/lResult',{
      uName: "",
      path: "login",
      result: 0

    });

  }else{

    req.session.uNum=loginCheck(uA, uP);
    res.render('pages/lResult',{
      uName: users[req.session.uNum].uName,
      path: "",
      result: 1
    });
  }
};

var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'public/uploads/'});
var fs = require('fs');
var path = require('path');

require('firebase-image-uploader');

exports.upload = function (req, res) {

    console.log(document.querySelector('[type=file]').value);

    /*var ref = firebase.database().ref('/images');
    var firebaseImageUploader = new FirebaseImageUploader(ref);

    document.querySelector('[type=file]').addEventListener('change', function () {
     firebaseImageUploader.upload(this.files); 
    });*/
};




