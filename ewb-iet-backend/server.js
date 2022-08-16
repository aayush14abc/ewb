const http = require('http');
const dotenv= require('dotenv');
const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require("mongoose");

const hostname = '0.0.0.0';
// const port = 3001;
const port= process.env.PORT || 3001;
app.use(cors());

dotenv.config({ path: './config.env'});

const DB=process.env.DATABASE;


// mongoose.connect('mongodb://localhost/contact', {useNewUrlParser:true});
mongoose.connect(DB, {
    useNewUrlParser:true
}).then(() => {
    console.log("Connection Successfull")
}).catch((err) => console.log("No connection"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var contactSchema=mongoose.Schema({
    fullname: String,
    phone:Number,
    email:String,
    msg:String
});
var info=mongoose.model('info', contactSchema);

app.options('/Contact', cors())

app.post('/Contact',cors(), function(req,res){
    var fullname=req.body.fullname;
    var phone=req.body.phone;
    var email=req.body.email;
    var msg=req.body.msg;

    
    var document1=new info({fullname:fullname, phone:phone, email:email, msg:msg});
    document1.save(function(err,data){
        if(err){
            res.send({status:0,result:err})
        }
        else{
            res.send({status:1, result:data})
        }
    });

    // console.log('---------',req.body);
    console.log('-----info----',document1);
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});