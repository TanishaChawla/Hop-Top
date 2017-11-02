var express = require('express');
var app = express();
var ejs = require("ejs");
var path = require("path");

app.use(express.static(path.join(__dirname,'views')));
app.use(express.static(path.join(__dirname,'public')));

app.set('port',process.env.PORT || 3000);
app.set("view engine",ejs);
app.get("/",function(req,res){
  res.render("menu.ejs");
});
app.get('/level2',function(req,res){
  res.render("level2.ejs");
})
app.get('/level1',function(req,res){
  res.render("level1.ejs");
})
app.listen(app.get('port'),function(){
  console.log("started on port "+app.get('port'));
})
