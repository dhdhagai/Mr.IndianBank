var express = require("express");
require("dotenv").config()
var app = express();
var bodyParser = require("body-parser");
let verifresponse;
let resamt;
let code;
const { mongoClient, ObjectId } = require("mongodb")
const { MongoClient } = require("mongodb");

let resp;
let sum;
function getcode(max) {
  const res = Math.floor(Math.random()*max * max * 20 /1 * 10 + 10)
  return res;
}
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.UNAME,
    pass: process.env.PASS,
  },
});
function send(reciever, code) {
 
transporter.sendMail({
    from: '"Le Mr India Bank" <youremail@gmail.com>', // sender address
    to: `${reciever}`, // list of receivers
    subject: "Verify Your Le Mr.India Bank account", // Subject line

    html: `Your verification code is ${code}`, // html body
  }).then(info => {
    console.log({info});
  }).catch(console.error);   
}
// Connection URI
const uri =
  `mongodb+srv://dhdhagai:${process.env.MONGOPASS}@cluster0.ifxzk.mongodb.net/Bal?retryWrites=true&w=majority`;
// Create a new MongoClient
const client = new MongoClient(uri);

  async function run(bal,id,req,res) {
    try {
      // Connect the client to the server
      const com = await client.connect();
      console.log("Connected successfully to server");
      const database = client.db("Bal");
      
      // Establish and verify connection
      await client.db("admin").command({ ping: 1 });
      
      const movies = database.collection("Balance");
      const balance = await movies.findOne({Name:id, })
      console.log(eval(sum))
       sum = `${balance.balance} + ${bal}`
      resp = await movies.findOneAndUpdate({Name: id},    {
        $set: {
          balance: eval(sum)
        }
      })
    }catch(err){
      console.log(err)
    } finally {
      if(eval(sum) == undefined){
        res.end("There was a error in the name, Please Ensure That the name is correct")

      }else{
        res.end(`New Balance: ${eval(sum)}`)
      
      }  
      
      await client.close();
    }
  }
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public"));
app.get("/index.html", function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});
app.post("/process_post", urlencodedParser, function (req, res) {
resamt = {
    bal: req.body.bal,
    id: req.body.id,
    email:req.body.email
  };
  res.redirect("/verify")
});

app.get("/verify", (req,res) => {
  res.sendFile(__dirname + "/public/"+'verify.html')
  code = getcode(6)
  send(resamt.email,code)
  
})
app.post("/verify",urlencodedParser, (req,res) => {
  console.log(req)
  verifresponse = {
    code: req.body.code
  }
  if(verifresponse.code == code){
    run(resamt.bal, resamt.id,req,res)
  } else{
    res.end("Code is not matching. Aborting")
  }
})
app.get("/with")
var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = 8000
  console.log("app listening at http://localhost:",port);
});