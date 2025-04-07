const express = require('express');
const app = express();


app.get('/', (req, res)=>{
    res.send('Hello GearTickets Backend !')
})

app.listen(4000);