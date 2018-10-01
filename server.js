
var exp = require('express');
var parser = require('body-parser');
var cors = require ('cors');
// var upm = require('./mymodule.js');

var MongoClient = require('mongodb').MongoClient;
// var x = {
//     "prodname":"Samsung",
//     "price": 1000,
//     "prodDesc":"Good Item"
// }



var app = exp();
app.use(parser.json());
var url = "mongodb://localhost:27017/";
app.get("/rest/api/insert", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
//console.log(req.body);
//res.send(req.body);

    
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("productDatabase");
 var myobj = [
    { pid:1,pname: 'Samsung', price: 5000, description: 'SmartPhone'},
    { pid:2, pname: 'MotoRole', price: 52000, description: 'SmartPhone'},
    { pid:3, pname: 'OnePlus', price: 6000, description: 'SmartPhone'},
    { pid:4, pname: 'Huawei', price: 7000, description: 'SmartPhone'},
    { pid:5, pname: 'Apple', price: 8000, description: 'SmartPhone'},
    { pid:6, pname: 'Nokia', price: 9000, description: 'SmartPhone'},
    { pid:7, pname: 'Sony', price: 1000, description: 'SmartPhone'},
    { pid:8, pname: 'LG', price: 2000, description: 'SmartPhone'},
    { pid:9, pname: 'Lenovo', price: 3000, description: 'SmartPhone'}

  ];
  dbo.collection("productCollection").insert(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

});

app.get("/rest/api/read", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
//console.log("heree");
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("productDatabase");
  dbo.collection("productCollection").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
      res.send(result);
    db.close();
  
  });
});

});


app.post("/rest/api/delete", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
console.log(req.body);
res.send(req.body);

MongoClient.connect('mongodb://localhost:27017/',
function(err, dbvar){
    if(err) throw err;
    // var x = { pname: 'Lenovo', price: 3000, description: 'SmartPhone'};
    var coll = dbvar.db('productDatabase');
    coll.collection('productCollection').remove(req.body, true, function(err,res){
        if(err) throw err;
        console.log("1 document deleted");
        dbvar.close();
    })          
    dbvar.close();
})
});



app.get("/rest/api/update", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
    
MongoClient.connect('mongodb://localhost:27017/',
function(err, dbvar){
    if(err) throw err;
    // var y = {"name":x.name,"age":x.age};
   // console.log(x.value);
    var coll = dbvar.db('productDatabase');
    //var j = x.key;
    //console.log(x);
  var myquery = { pname: "Nokia" };
  var newvalues = { $set: { price: "123333" } };
    coll.collection('productCollection').updateOne(myquery,newvalues,function(err,res){
        if(err) throw err;
        console.log("1 document updated");
        dbvar.close();
    })          
    dbvar.close();
})
});

app.post("/rest/api/write", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
console.log(req.body);
res.send(req.body);

MongoClient.connect('mongodb://localhost:27017/',
function(err, dbvar){
    if(err) throw err;

    var coll = dbvar.db('productDatabase');
    coll.collection('productCollection').insertOne(req.body, true, function(err,res){
        if(err) throw err;
        console.log("1 document inserted");
        dbvar.close();
    })          
    dbvar.close();
})
});

app.post("/rest/api/deleteAll", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
console.log(req.body);
//res.send(req.body);

MongoClient.connect('mongodb://localhost:27017/',
function(err, dbvar){
    if(err) throw err;
    // var x = { pname: 'Lenovo', price: 3000, description: 'SmartPhone'};
    var coll = dbvar.db('productDatabase');
    coll.collection('productCollection').remove({}, true, function(err,res){
        if(err) throw err;
        console.log("All documents deleted");
        dbvar.close();
    })          
    dbvar.close();
})
});


app.use(cors()).listen(1234, ()=>{
    console.log('Express Started')
})



app.post('/rest/api/update', (req,res)=>{

    
    res.header("Access-Control-Allow-Origin","*");
     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept"); 

     x = req.body;

     //console.log(x);

//console.log("udateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    

MongoClient.connect('mongodb://localhost:27017/',
function(err, dbvar){
    if(err) throw err;
    var y = {pname:x.oname};
    console.log('yo'+x.oname);
    
    var coll = dbvar.db('productDatabase');
  //  var j = x.key;
 //   console.log(x);
    coll.collection('productCollection').update(y,{$set:{"pid":x.id,"pname":x.name,"price":x.price,"description":x.description}}, true, function(err,res){
        if(err) throw err;
        console.log("1 document updated");
        dbvar.close();
    })          
    dbvar.close();
})


    
});

