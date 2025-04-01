const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", (req, res)=>{
    // res.send("hello world!");
    res.render("home");

})

app.listen(3002);