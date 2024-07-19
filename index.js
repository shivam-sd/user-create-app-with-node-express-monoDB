const express = require('express');
const app = express();
const path = require('path');
const usermodel = require('./models/user');

app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/" , function(req,res,next){
    res.render("index");
});

app.get("/user" , async function(req,res,next){
    const users = await usermodel.find();
    res.render("user" , {users});
});

app.get("/delete/:id" , async function(req,res){
    const deletuser = await usermodel.findOneAndDelete({_id:req.params.id});
    res.redirect('/user');
})

app.post("/create" , async function(req,res){
   const createuser = await usermodel.create({
        image:req.body.image,
        name:req.body.name,
        email:req.body.email
    });
    // console.log(createuser)
    res.redirect("/user")
});

app.get("/update/:userid" , async function(req,res){
    const user = await usermodel.findOne({_id:req.params.userid});
    res.render('update', {user})
});

app.post("/update/:userid" , async function(req,res){
    const update = await usermodel.findOneAndUpdate({_id:req.params.userid}, {
        name:req.body.name,
        image:req.body.image,
        email:req.body.email
    })
    res.redirect("/user")
});

app.listen(3000)
