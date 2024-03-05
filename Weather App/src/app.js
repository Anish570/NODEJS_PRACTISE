const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;
app.get('/',(req,res) =>{
        res.send("hello world");
});

app.listen(port,()=>{
        console.log("sertver has started");
});