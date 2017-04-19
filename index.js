var express = require("express");
var bodyParser = require('body-parser');
var paser = bodyParser.urlencoded({extended: false});
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3000);
app.get("/", function(req, res){
  res.render("homepage");
});

var mang = ["Android", "iOS", "PHP", "React"];

app.post('/getNotes',function(req, res){
  res.send(mang);
});

app.post('/add',paser,function(req, res){
  var newNote = req.body.note;
  mang.push(newNote);
  res.send(mang);
});

app.post('/delete', paser, function(req, res){
  var idNote = req.body.idXoa;
  mang.splice(idNote,1);
  res.send(mang);
});

app.post('/save', paser, function(req, res){
  var id = req.body.idSua;
  mang[id] = req.body.noiDung;
  res.send(mang);
});