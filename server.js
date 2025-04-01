const express = require('express');
const app = express();

app.use(function (req, res, next){
    res.locals.errors = [];
    next();
})

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));


app.get("/", (req, res)=>{
    
    res.render("home");
})

app.get("/login", (req, res)=>{
    res.render("login");
})

app.post("/register", (req, res)=>{
    const errors = [];

    if(typeof req.body.name !== "string") req.body.name = "";
    if(typeof req.body.email !== "string") req.body.email = "";
    if(typeof req.body.password !== "string") req.body.password = "";
    
    req.body.name = req.body.name.trim();
    req.body.email = req.body.email.trim();
    
    if(!req.body.name) errors.push("You must provide a name");
    if(req.body.name && req.body.name.length < 3) errors.push("Name must be at least 3 characters");
    if(req.body.name && req.body.name.length > 10) errors.push("Name cannot be more than 10 characters");
    
    if(errors.length){
        return res.render("home",{errors})
        
    } else {
        res.send("Thank you !");

    }
    
})
app.listen(3002);