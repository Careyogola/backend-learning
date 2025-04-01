require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("better-sqlite3")("ourApp.db");
db.pragma("journal_mode = WAL");
// DB SETUP

const createTables = db.transaction(()=>{
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username STRING NOT NULL UNIQUE,
        email STRING NOT NULL,
        password STRING NOT NULL
        )
        `).run()
});
createTables()



//DB ENDS
const app = express(); //INITIALISATION

app.use(function (req, res, next){
    res.locals.errors = [];

    // try to decode incoming cookie
    try{

    } catch(error){

    }
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
    
    if(req.body.password && req.body.password.length < 5) errors.push("Password cannot be less than 5 characters");
    if(req.body.password && req.body.password.length > 12) errors.push("Pasword shouldn't exceed 12 characters");

    if(errors.length){
        return res.render("home",{errors})
        
    } 
    // save new user to db

    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const ourStatement = db.prepare("INSERT INTO users (username, email, password) VALUES(?, ?, ?)");
    ourStatement.run(req.body.name, req.body.email, req.body.password);



    //login user by giving them cookies
    const ourTokenValue = jwt.sign({skyColor: "blue", userid: 3}, process.env.JWTSECRET)
    res.cookie("oursimpleapp", "supertopsecretvalue", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 *60 *24
    })
    
    res.send("Thank You!")
})
app.listen(3002);