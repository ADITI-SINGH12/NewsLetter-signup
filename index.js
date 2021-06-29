//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
       {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

  const jsonData = JSON.stringify(data);
  const url = "https://us6.api.mailchimp.com/3.0/lists/8943ec7e43";
  const options = {
    method: "POST",
    auth: "aditi1:7be98f7626834c614cd89003037dff49-us6"
  }
   const request = https.request(url,options,function(response){
     if(response.statuscode === 200) {
       res.sendFile(__dirname + "/failure.html");
     } else {
       res.sendFile(__dirname + "/success.html");
     }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.post("/failure", function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

 //api keys 7be98f7626834c614cd89003037dff49-us6
 //list id 8943ec7e43
